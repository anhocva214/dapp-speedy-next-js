import Image from "next/image";

interface IProps{
    name: string;
    imageUrl: string;
    price: number;
}

export default function CardProduct(props: IProps) {

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
                        <i className="fa-solid fa-coin-vertical"></i>
                        <strong>{props.price}</strong>
                    </span>
                </div>
                <div className="w-full py-2">
                    <h4 className="font-semibold text-zinc-500">{props.name}</h4>
                </div>
                <div className="w-full">
                    <button className="w-full flex rounded-md overflow-hidden group outline-0">
                        <h6 className='bg-gray-100 w-full py-2 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300'>Thêm</h6>
                        <a role="button" className="w-14 py-2 bg-gray-200 h-full block text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                            <i className="fa-solid fa-plus"></i>
                        </a>
                    </button>
                </div>
            </div>

        </div>
    )
}