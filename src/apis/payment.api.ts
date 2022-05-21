import { baseApi } from '@services/api'
import { paths } from './exports'


export function requestPayment(amount: string){
    return baseApi<string>({
        path: paths.requestPayment(amount),
        method: 'GET'
    })
}