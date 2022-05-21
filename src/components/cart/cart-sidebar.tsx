import { alertActions } from "@redux/alert.redux";
import { paymentActions, paymentSelector } from "@redux/payment.redux";
import { productSelector } from "@redux/product.redux";
import { settingActions, settingSelector } from "@redux/setting.redux";
import { userSelector } from "@redux/user.redux";
import { useMetaMask } from "metamask-react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cart-item";
import _ from 'lodash'
import { CircleSpinner } from "react-spinners-kit";


export default function CartSidebar() {
    const dispatch = useDispatch()
    const {cartSidebarToggle} = useSelector(settingSelector)
    const {cart} = useSelector(productSelector)
    const {authenticated} = useSelector(userSelector)
    const {isLoadingPayment} = useSelector(paymentSelector)
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    function payment(){
        if (!authenticated){
            dispatch(alertActions.error("Bạn cần đăng nhập để mua hàng"))
            return;
        }
        if (status != 'connected'){
            dispatch(alertActions.error("Bạn chưa kết nối Metamask"))
            return;
        }
        if (cart.length == 0){
            dispatch(alertActions.error("Giỏ hàng chưa có sản phẩm"))
            return;
        }
        dispatch(paymentActions.paymentProduct({
            myAddress: account
        }))
    }

    return (
        <>
            <a onClick={() => dispatch(settingActions.openCartSidebar())} role="button" className="flex bg-emerald-500 p-3 w-fit gap-2 justify-center items-center flex-col rounded-l-md fixed z-40 top-1/2 right-0 transition-all duration-300 hover:bg-emerald-600">
                <span className="text-sm w-full flex justify-between items-center gap-2 text-white font-medium" >
                    <i className="fa-solid fa-basket-shopping-simple"></i> {cart.length} sản phẩm
                </span>
                <span className="bg-white p-2 text-sm text-emerald-600 rounded-md w-full flex justify-center items-center gap-1">
                    <i className="fa-solid fa-coin-vertical"></i> {_.sumBy(cart, (p) => p.amount*p.price).toFixed(3)}
                </span>
            </a>

            <div className={`fixed z-50 top-0 w-[450px] h-screen bg-white flex flex-col justify-between transition-all duration-300 ${cartSidebarToggle?'right-0':'-right-full'}`}>
                {/* Cart header */}
                <div className="h-16 border-b flex items-center px-5">
                    <span className="w-full flex items-center gap-2 font-medium text-emerald-600" >
                        <i className="fa-solid fa-basket-shopping-simple text-lg"></i> {cart.length} sản phẩm
                    </span>
                    <a onClick={() => dispatch(settingActions.closeCartSidebar())} role="button" className="w-9 h-8 bg-gray-200 flex justify-center items-center rounded-full hover:bg-emerald-500 text-zinc-400 hover:text-white transition-all duration-300">
                        <i className="fa-solid fa-xmark"></i>
                    </a>
                </div>
                {/* Cart content */}
                <div className='h-full mb-5 overflow-y-auto'>
                    {cart.map((item, index) => (
                        <div key={item.name} className='py-3 border-b px-5'>
                            <CartItem item={item} />
                        </div>
                    ))}
                </div>
                {/* Cart footer */}
                <div onClick={payment} className="px-5 pb-5">
                    <button className='w-full flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-white font-semibold py-3'>
                        Thanh toán <CircleSpinner size={20} loading={isLoadingPayment} />
                    </button>
                </div>
            </div>

            <div onClick={()=>{
                dispatch(settingActions.closeCartSidebar())
            }} className={`fixed top-0 left-0 w-screen h-screen transition-all duration-300 z-40 ${cartSidebarToggle?' bg-black/50 visible':' bg-transparent invisible'}`} ></div>
        </>
    )
}