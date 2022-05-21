import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/reducer'
import { AppThunk } from '.';
import Web3 from 'web3'

export interface ContractCoinState {
    contractCoinAddress: string;
    web3: Web3,
}

export const initialState: ContractCoinState = {
    contractCoinAddress: '0x69A28028c362181d29E47e88259Fc8e4cC252794',
    web3: null
}

export const contractCoinSlice = createSlice({
    name: 'contractCoin',
    initialState,
    reducers: {
        initWeb3: (state, { payload }: PayloadAction<{
            web3: Web3,
        }>) => {
            state.web3 = payload.web3
            console.log("Setup web3 successfully");
            
        },
    },
})

export const contractCoinReducer = contractCoinSlice.reducer
export const contractCoinSelector = (state: RootState) => state.contractCoin
export const actions = contractCoinSlice.actions

/*--------------------------*/
/*------- ACTIONS ----------*/
/*--------------------------*/

export const sendTransaction = (data: {
    myAddress: string;
    dataEncodeABI: string;
    onSuccess: () => void;
    onFailure: () => void;
    onDenied: () => void;
}): AppThunk => async (dispatch, getState) => {

    const tx = {
        from: data.myAddress,
        to: getState().contractCoin.contractCoinAddress,
        data: data.dataEncodeABI
    }

    await getState().contractCoin.web3.eth.sendTransaction(tx).then(res => {
        data.onSuccess()
    }).catch(err => {
        console.log("Error send transaction: ", err)
        if (err.code == 4001){
            data.onDenied()
        }else
        data.onFailure()
    })
}

export const contractCoinActions = {
    initWeb3: actions.initWeb3,
    sendTransaction
}
