import { ProductInCart } from "@models/product.model"
import { productActions } from "@redux/product.redux"
import { useDispatch } from "react-redux"

interface IProps {
  item: ProductInCart
}

export default function CartItem(props: IProps) {

  const dispatch = useDispatch()

  return (
    <div className='flex justify-between items-center gap-5'>
      <div className='flex flex-col w-8 p-2 gap-1 bg-gray-200 items-center justify-center rounded-full'>
        <button onClick={() => dispatch(productActions.addToCart(props.item))} className='text-sm w-full'>
          <i className="fa-solid fa-plus"></i>
        </button>
        <span className="font-semibold">1</span>
        <button onClick={() => dispatch(productActions.removeFromCart(props.item))} className='text-sm w-full'>
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>
      <div className='flex w-full items-center gap-5'>
        <img width={50} src={props.item.imageUrl} alt="" />
        <div>
          <h5 className='font-semibold'>{props.item.name}</h5>
          <h5>
            <span className='font-semibold text-emerald-600'>{props.item.price} AH</span>
            <span> x {props.item.amount}</span>
          </h5>
        </div>
      </div>
      <div className="flex gap-3 w-full items-center justify-end">
        <h5 className='font-bold text-sm flex'>
          {(props.item.amount * props.item.price).toFixed(3)} AH
        </h5>
        <a role="button" className="w-6 h-6 bg-gray-100 flex justify-center items-center rounded-full hover:bg-red-500 text-zinc-500 hover:text-white transition-all duration-300">
          <i className="fa-solid fa-xmark text-xs"></i>
        </a>
      </div>
    </div>
  )
}