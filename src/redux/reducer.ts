import { combineReducers } from '@reduxjs/toolkit'

/* PLOP_INJECT_IMPORT */
import { contractCoinReducer } from './contract-coin.redux';
import { settingReducer } from './setting.redux';
import { userReducer } from './user.redux'
import {alertReducer} from './alert.redux'


const rootReducer = combineReducers({
    /* PLOP_INJECT_USE */
	contractCoin: contractCoinReducer,
	setting: settingReducer,
    user: userReducer,
    alert: alertReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer