
// Demo
export const getUsers = "/users"

// User
export const registerNewUser = "/v1/users/register"
export const login = "/v1/users/login"
export const getMyBalance = "/v1/users/my-balance"
export const receiveCoinFree = "/v1/users/receive-coin-free"
export const authenticate = "/v1/users/authenticate"
export const myBalance = "/v1/users/my-balance"


// Payment
export const requestPayment = (amount: string) => "/v1/payments/request/"+amount