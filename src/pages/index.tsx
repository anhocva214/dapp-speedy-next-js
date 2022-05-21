import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userActions, userSelector } from '@redux/user.redux'
import { CircleSpinner, ClapSpinner } from 'react-spinners-kit'
import { Img } from 'src/resources/img'
import LogoImage from '@components/header/logo-image'
import SidebarMenuItem from '@components/sidebar/menu-item'
import Siderbar from '@components/sidebar'
import Image from 'next/image'
import CardProduct from '@components/card/card-product'
import CartSidebar from '@components/cart/cart-sidebar'
import { settingActions } from '@redux/setting.redux'
import ProductDataMock from '@resources/mock/products.mock.json'
import MainLayout from '@layouts/MainLayout'


export default function Home() {
  const dispatch = useDispatch()


  return (
    <MainLayout>


      

      {/* Cart */}
      <CartSidebar />

      <main>
        <section className=''
          style={{
            backgroundImage: 'url(https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F904%2Fgrocery.png&w=1920&q=75)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <div className="flex justify-center items-center full-screen-except-header relative">
              <div className="w-full flex flex-col items-center">
                <h1 className='text-5xl font-bold uppercase text-zinc-800 mb-12'>Giao dịch bảo mật tuyệt đối</h1>

                <div className='flex shadow-900 w-full max-w-[800px] shadow-xl rounded-md overflow-hidden'>
                  <input type="text" className='w-full outline-0 p-4' placeholder='Tìm kiếm sản phẩm của bạn' />
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 w-44 flex items-center gap-2 justify-center transition-all duration-300" >
                    <i className="fa-regular fa-magnifying-glass"></i>
                    Tìm kiếm
                  </button>
                </div>

                <div className="flex justify-between w-full max-w-[800px]">
                  <img src="/img/item-1.png" width={300} alt="" />
                  <img src="/img/item-2.png" width={300} alt="" />
                </div>

              </div>

              {/* <div className="absolute bottom-0 right-0">
                <img src="/img/item-1.png" width={300} alt="" />
              </div>

              <div className="absolute bottom-0 left-0">
                <img src="/img/item-2.png" width={300} alt="" />
              </div> */}

            </div>
          </div>
        </section>
        <hr />
        <section className='bg-gray-100 '>
          <div className="grid grid-cols-12">
            {/* <div className="col-span-2 h-screen sticky top-0">
              <div className="bg-white px-5 py-8">
                <Siderbar />
              </div>
            </div> */}
            <div className="col-span-full">
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {ProductDataMock.map((product, index) => (
                    <div key={index} className="col-span-1">
                      <CardProduct
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.price}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
