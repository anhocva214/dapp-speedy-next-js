import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/reducer'
import { AppThunk } from '.';

export interface SettingState {
    cartSidebarToggle: boolean;
}

export const initialState: SettingState = {
    cartSidebarToggle: false,
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        openCartSidebar: (state, {payload}: PayloadAction<string>) => {
            state.cartSidebarToggle = true;
        },
        closeCartSidebar: (state, {payload}: PayloadAction<string>) => {
            state.cartSidebarToggle = false;
        },
    },
})

export const settingReducer = settingSlice.reducer
export const settingSelector = (state: RootState) => state.setting
export const actions = settingSlice.actions

/*--------------------------*/
/*------- ACTIONS ----------*/
/*--------------------------*/


export const settingActions = {
    openCartSidebar: actions.openCartSidebar,
    closeCartSidebar: actions.closeCartSidebar
}
