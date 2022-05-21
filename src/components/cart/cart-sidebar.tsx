import { productSelector } from "@redux/product.redux";
import { settingActions, settingSelector } from "@redux/setting.redux";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cart-item";


export default function CartSidebar() {
    const dispatch = useDispatch()
    const {cartSidebarToggle} = useSelector(settingSelector)
    const {cart} = useSelector(productSelector)

    return (
        <>
            <div className={`fixed z-50 top-0 w-[450px] h-screen bg-white flex flex-col justify-between transition-all duration-300 ${cartSidebarToggle?'right-0':'-right-full'}`}>
                {/* Cart header */}
                <div className="h-16 border-b flex items-center px-5">
                    <span className="w-full flex items-center gap-2 font-medium text-emerald-600" >
                        <i className="fa-solid fa-basket-shopping-simple text-lg"></i> 3 items
                    </span>
                    <a role="button" className="w-9 h-8 bg-gray-200 flex justify-center items-center rounded-full hover:bg-emerald-500 text-zinc-400 hover:text-white transition-all duration-300">
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
                <div className="px-5 pb-5">
                    <button className='w-full rounded-full bg-emerald-500 text-white font-semibold py-3'>
                        Thanh toán
                    </button>
                </div>
            </div>

            <div onClick={()=>{
                dispatch(settingActions.closeCartSidebar())
            }} className={`fixed top-0 left-0 w-screen h-screen transition-all duration-300 z-40 ${cartSidebarToggle?' bg-black/50 visible':' bg-transparent invisible'}`} ></div>
        </>
    )
}