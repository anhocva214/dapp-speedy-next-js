

export default function CartSidebar() {

    return (
        <>
            <div className="fixed z-50 top-0 right-0 w-[450px] h-screen bg-white flex flex-col justify-between ">
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
                <div className='h-full px-5 mb-5 overflow-y-auto'>

                </div>
                {/* Cart footer */}
                <div className="px-5 pb-5">
                    <button className='w-full rounded-full bg-emerald-500 text-white font-semibold py-3'>
                        Thanh toán
                    </button>
                </div>
            </div>

            <div className="fixed z-40 top-0 left-0 w-screen h-screen bg-black/50" ></div>
        </>
    )
}