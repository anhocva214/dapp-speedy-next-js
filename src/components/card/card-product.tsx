import { Product, ProductInCart } from "@models/product.model";
import { productActions, productSelector } from "@redux/product.redux";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
    name: string;
    imageUrl: string;
    price: number;
}

export default function CardProduct(props: IProps) {

    const dispatch = useDispatch()

    const { cart } = useSelector(productSelector)

    return (
        <div className="w-full bg-white flex flex-col items-center border rounded-md">
            <a role={'button'} className="my-10">
                <Image
                    src={props.imageUrl}
                    width={200}
                    height={200}
                />
            </a>
            <div className='px-6 pb-6 w-full'>
                <div className="w-full flex gap-2">
                    <span className="flex gap-1 items-center text-lg">
                        <strong>{props.price} AH</strong>
                    </span>
                </div>
                <div className="w-full py-2">
                    <h4 className="font-semibold text-zinc-500">{props.name}</h4>
                </div>
                <div className="w-full">
                    {
                        cart.filter(item => item.name == props.name).length == 0 ? (
                            <button
                                onClick={() => {
                                    dispatch(productActions.addToCart(new ProductInCart(props as any)))
                                }}
                                className="w-full flex rounded-md overflow-hidden group outline-0">
                                <h6 className='bg-gray-100 w-full py-2 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300'>Thêm</h6>
                                <a role="button" className="w-14 py-2 bg-gray-200 h-full block text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <i className="fa-solid fa-plus"></i>
                                </a>
                            </button>
                        ) : (
                            <button className="w-full flex justify-between rounded-md overflow-hidden group outline-0">
                                <a onClick={() => {
                                    dispatch(productActions.removeFromCart(new Product(props as any)))
                                }} role="button" className="w-14 py-2 h-full block bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300">
                                    <i className="fa-solid fa-minus"></i>
                                </a>
                                <h6 className='w-full py-2 bg-emerald-600 text-white transition-all duration-300'>{cart.filter(item => item.name == props.name)[0].amount}</h6>
                                <a onClick={() => {
                                    dispatch(productActions.addToCart(new ProductInCart(props as any)))
                                }} role="button" className="w-14 py-2 h-full block bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300">
                                    <i className="fa-solid fa-plus"></i>
                                </a>
                            </button>
                        )
                    }

                </div>
            </div>

        </div>
    )
}