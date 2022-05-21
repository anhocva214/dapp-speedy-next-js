import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@redux/reducer'
import { AppThunk } from '.';
import { userApi } from '@apis/exports';
import Router from 'next/router';
import { routes } from '@utils/routes';
import { IErrorsResponse } from 'src/models/errors-response';
import { User, UserLoginDTO, UserRegisterDTO } from '@models/user.model';
import { alertActions } from './alert.redux';
import cookie from 'react-cookies'
import { contractCoinActions } from './contract-coin.redux';

export interface UserState {
    isLoadingRegister: boolean;
    user: User;
    errorsResponse: IErrorsResponse;
    isLoadingLogin: boolean;
    authenticated: boolean;
    isLoadingReceiveCoinFree: boolean;
    balance: number;
    isLoadingMyBalance: boolean;
}

export const initialState: UserState = {
    isLoadingRegister: false,
    user: null,
    errorsResponse: {},
    isLoadingLogin: false,
    authenticated: false,
    isLoadingReceiveCoinFree: false,
    balance: 0,
    isLoadingMyBalance: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Register new user
        loadingRegister: (state) => {
            state.isLoadingRegister = true;
        },
        registerNewUserSuccess: (state) => {
            state.isLoadingRegister = false;
            Router.push(routes.login);
        },
        registerNewUserFail: (state, { payload }: PayloadAction<IErrorsResponse>) => {
            state.isLoadingRegister = false;
            state.errorsResponse = payload
        },
        // Login
        loadingLogin: (state) => {
            state.isLoadingLogin = true;
        },
        loginSuccess: (state, { payload }: PayloadAction<User>) => {
            state.isLoadingLogin = false;
            state.user = payload;
            state.authenticated = true;
            Router.push(routes.home)
        },
        loginFail: (state, { payload }: PayloadAction<IErrorsResponse>) => {
            state.isLoadingLogin = false;
            state.errorsResponse = payload;
            state.authenticated = false;
        },
        // Authenticate
        authenticateSuccess: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
            state.authenticated = true;
        },
        // My Balance
        loadingMyBalance: (state) => {
            state.isLoadingMyBalance = true;
        },
        getMyBalanceSuccess: (state, { payload }: PayloadAction<number>) => {
            state.isLoadingMyBalance = false;
            state.balance = payload;
        },
        getMyBalanceFail: (state) => {
            state.isLoadingMyBalance = false;
        },
        // Receive coin free
        loadingReceiveCoinFree: (state) => {
            state.isLoadingReceiveCoinFree = true;
        },
        receiveCoinFreeSuccess: (state, { payload }: PayloadAction<number>) => {
            state.isLoadingReceiveCoinFree = false;
        },
        receiveCoinFreeFail: (state) => {
            state.isLoadingReceiveCoinFree = false;
        }
    },
})

export const userReducer = userSlice.reducer
export const userSelector = (state: RootState) => state.user
export const actions = userSlice.actions

/*--------------------------*/
/*------- ACTIONS ----------*/
/*--------------------------*/

const registerNewUser = (data: UserRegisterDTO): AppThunk => async (dispatch) => {
    try {
        dispatch(actions.loadingRegister())
        let response = await userApi.register(data)
        dispatch(actions.registerNewUserSuccess())
        dispatch(alertActions.success(response.message))
    }
    catch (err) {
        console.log(err)
        if (!!err?.data?.errors)
            dispatch(actions.registerNewUserFail(err?.data?.errors))
    }
}

const login = (data: UserLoginDTO): AppThunk => async (dispatch) => {
    try {
        dispatch(actions.loadingLogin())
        let response = await userApi.login(data)
        dispatch(actions.loginSuccess(response.user))
        dispatch(alertActions.success(response.message))
        cookie.save('access_token', response.token.access_token, { path: '/', maxAge: response.token.expires_in })
    }
    catch (err) {
        console.log(err)
        if (!!err?.data)
            dispatch(actions.loginFail(err?.data?.errors || {}))
        if (!!err?.data?.message)
            dispatch(alertActions.error(err?.data?.message))
    }
}

const authenticate = (): AppThunk => async (dispatch) => {
    try {
        let user = await userApi.authenticate()
        dispatch(actions.authenticateSuccess(user))
    }
    catch (err) {
        console.log(err)
    }
}

const getMyBalance = (data: {
    address: string
}): AppThunk => async (dispatch) => {
    try {
        dispatch(actions.loadingMyBalance())
        let balance = await userApi.myBalance(data)
        dispatch(actions.getMyBalanceSuccess(parseFloat(balance)))
    }
    catch (err) {
        console.log(err)
        dispatch(actions.getMyBalanceFail())
    }
}

const receiveCoinFree = (data: {
    address: string
}): AppThunk => async (dispatch) => {
    try {
        dispatch(actions.loadingReceiveCoinFree())
        let response = await userApi.receiveCoinFree(data)
        dispatch(contractCoinActions.sendTransaction({
            myAddress: data.address,
            dataEncodeABI: response.encodeABI,
            onSuccess: () => {
                dispatch(actions.receiveCoinFreeSuccess())
                dispatch(userActions.getMyBalance(data))
                dispatch(alertActions.success(`Bạn đã nhận được ${response.amount} AH `))
            },
            onDenied: () => {
                dispatch(actions.receiveCoinFreeFail())
            },
            onFailure: () => {
                dispatch(actions.receiveCoinFreeFail())
            }

        }))
    }
    catch (err) {
        console.log(err)
        dispatch(actions.receiveCoinFreeFail())
    }
}

export const userActions = {
    registerNewUser,
    login,
    authenticate,
    getMyBalance,
    receiveCoinFree
}
