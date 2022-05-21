import { baseApi } from '@services/api'
import { TokenAuthenticate, User, UserLoginDTO, UserRegisterDTO } from '@models/user.model'
import { paths } from './exports'


export const getUsers = () => {
    return baseApi<User[]>({
        endpoint: 'https://613b9431110e000017a456c5.mockapi.io/api/v1',
        path: paths.getUsers,
        method: 'GET',
    })
}

export const register = (data: UserRegisterDTO) => {
    return baseApi<{
        message: string;
        user: User;
    }>({
        path: paths.registerNewUser,
        method: 'POST',
        data
    })
}

export const login = (data: UserLoginDTO) => {
    return baseApi<{
        message: string;
        user: User;
        token: TokenAuthenticate
    }>({
        path: paths.login,
        method: 'POST',
        data
    })
}

export const authenticate = () => {
    return baseApi<User>({
        path: paths.authenticate,
        method: 'GET'
    })
}

export const receiveCoinFree = (data: {
    address: string
}) => {
    return baseApi<{
        encodeABI: string,
        amount: number
    }>({
        path: paths.receiveCoinFree,
        method: 'POST',
        data
    })
}

export const myBalance = (data: {
    address: string
})=>{
    return baseApi<string>({
        path: paths.getMyBalance,
        method: 'POST',
        data
    })
}