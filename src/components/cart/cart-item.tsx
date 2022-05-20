

export default function CartItem(){

    return(
        <div className='flex justify-between items-center gap-5'>
        <div className='flex flex-col w-8 p-2 gap-1 bg-gray-200 items-center justify-center rounded-full'>
          <button className='text-sm w-full'>
            <i className="fa-solid fa-plus"></i>
          </button>
          <span className="font-semibold">1</span>
          <button className='text-sm w-full'>
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <div className='flex w-full items-center gap-5'>
          <img width={50} src="https://suckhoedoisong.qltns.mediacdn.vn/Images/nguyenkhanh/2020/09/07/ca_rot_vi_thuoc_chua_2.jpg" alt="" />
          <div>
            <h5 className='font-semibold'>Clementines</h5>
            <h5>
              <span className='font-semibold text-emerald-600'>$2.50</span>
              <span> x 1</span>
            </h5>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <h5 className='font-bold text-sm'>$2.50</h5>
          <a role="button" className="w-6 h-6 bg-gray-100 flex justify-center items-center rounded-full hover:bg-red-500 text-zinc-500 hover:text-white transition-all duration-300">
            <i className="fa-solid fa-xmark text-xs"></i>
          </a>
        </div>
      </div>
    )
}