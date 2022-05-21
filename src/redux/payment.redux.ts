import { paymentApi } from '@apis/exports';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/reducer'
import { AppThunk } from '.';
import _ from 'lodash'
import { contractCoinActions } from './contract-coin.redux';
import { userActions } from './user.redux';
import { alertActions } from './alert.redux';
import { productActions } from './product.redux';

export interface PaymentState {
    isLoadingPayment: boolean,

}

export const initialState: PaymentState = {
    isLoadingPayment: false,
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        // Payment
        loadingPayment: (state) => {
            state.isLoadingPayment = true;
        },
        paymentSuccess: (state) => {
            state.isLoadingPayment = false;
        },
        paymentFail: (state)=>{
            state.isLoadingPayment = false
        }
    },
})

export const paymentReducer = paymentSlice.reducer
export const paymentSelector = (state: RootState) => state.payment
export const actions = paymentSlice.actions

/*--------------------------*/
/*------- ACTIONS ----------*/
/*--------------------------*/

const paymentProduct = (data:{
    myAddress: string
}): AppThunk => async (dispatch, getState) =>{
    try{
        dispatch(actions.loadingPayment())
        let encodeABI = await paymentApi.requestPayment(_.sumBy(getState().product.cart, (p) => p.amount*p.price).toFixed(3))
        dispatch(contractCoinActions.sendTransaction({
            myAddress: data.myAddress,
            dataEncodeABI: encodeABI,
            onSuccess: ()=>{
                dispatch(actions.paymentSuccess())
                dispatch(productActions.resetCart())
                dispatch(alertActions.success("Thanh toán thành công"))
                dispatch(userActions.getMyBalance({address: data.myAddress}))
            },
            onDenied: ()=>{
                dispatch(actions.paymentFail())
            },
            onFailure: () => {
                dispatch(actions.paymentFail())
            }
        }))
    }
    catch (err){
        console.log(err)
        dispatch(actions.paymentFail())
    }
}


export const paymentActions = {
    paymentProduct
}
