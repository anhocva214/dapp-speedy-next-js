import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/reducer'
import { AppThunk } from '.';
import ProductDataMock from '@resources/mock/products.mock.json'
import { Product, ProductInCart } from '@models/product.model';


export interface ProductState {
    productList: Product[],
    cart: ProductInCart[],
}

export const initialState: ProductState = {
    productList: ProductDataMock,
    cart: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, {payload}: PayloadAction<ProductInCart>) => {
            let temp = [...state.cart]
            if (state.cart.filter(item => item.name == payload.name).length > 0){
                state.cart.forEach((item, index) => {
                    if (item.name == payload.name){
                        temp[index].amount += 1;
                    }
                })
            }
            else temp.push(payload);
            state.cart = temp
        },
        removeFromCart: (state, {payload}: PayloadAction<Product>)=>{
            let filter = state.cart.filter(item => item.name == payload.name)
            let temp = [...state.cart]
            if (filter.length > 0 && filter[0].amount > 1){
                state.cart.forEach((item, index) => {
                    if (item.name == payload.name){
                        temp[index].amount -= 1;
                    }
                })
            }
            else temp = state.cart.filter(item => item.name != payload.name);
            state.cart = temp
        }
    },
})

export const productReducer = productSlice.reducer
export const productSelector = (state: RootState) => state.product
export const actions = productSlice.actions

/*--------------------------*/
/*------- ACTIONS ----------*/
/*--------------------------*/


export const productActions = {
    addToCart: actions.addToCart,
    removeFromCart: actions.removeFromCart
}
