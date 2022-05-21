import { userActions, userSelector } from "@redux/user.redux"
import { routes } from "@utils/routes"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { CircleSpinner, ClassicSpinner } from "react-spinners-kit"
import LogoImage from "./logo-image"
import { useMetaMask } from "metamask-react";
import { alertActions } from "@redux/alert.redux"


export default function Header() {

    const router = useRouter()
    const dispatch = useDispatch()

    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const { authenticated, user, balance, isLoadingMyBalance, isLoadingReceiveCoinFree } = useSelector(userSelector)


    return (
        <header className="h-[70px] flex items-center" >
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="logo">
                        <LogoImage width={200} height={50} />
                    </div>
                    <nav className="flex items-center gap-8">
                        <a href="#" className="text-lg" >
                            <span>Liên hệ</span>
                        </a>

                        <button onClick={() => {
                            if (!authenticated) {
                                router.push(routes.login)
                            }
                            else if (status != 'connected'){
                                dispatch(alertActions.error("Bạn cần kết nối Metamask"))
                            }
                            else{
                                dispatch(userActions.receiveCoinFree({
                                    address: account
                                }))
                            }
                        }} className="bg-emerald-400 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2" >
                            Nhận ngay 10 AH <CircleSpinner size={18} loading={isLoadingReceiveCoinFree} />
                        </button>



                        {authenticated ? (
                            <>
                                {status == 'connected' ? (
                                    <div className="flex items-center gap-2" >
                                        <span className="" >Địa chỉ: {account.slice(0, 4)}...{account.slice(-4)}</span>
                                        <span className="font-semibold" >Số dư: {balance} AH</span>
                                        <button onClick={() => dispatch(userActions.getMyBalance({address: account}))}>
                                            <i className={`fa-regular fa-arrows-rotate ${isLoadingMyBalance&&'animate-spin'}`}></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={connect} className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-md" >
                                            Kết nối Metamask
                                        </button>
                                    </div>
                                )}
                                <button className="bg-white rounded-full" >
                                    <i className="fa-light fa-circle-user text-4xl text-emerald-500 bg-white"></i>
                                </button>
                            </>

                        ) : (
                            <button onClick={() => router.push(routes.login)} className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-md" >
                                Đăng nhập
                            </button>
                        )}


                    </nav>
                </div>
            </div>
        </header>
    )
}