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


export default function Home() {
  const dispatch = useDispatch()


  return (
    <>
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
              <button className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-md" >
                Đăng nhập
              </button>
              <button className="bg-white rounded-full" >
                <i className="fa-light fa-circle-user text-4xl text-emerald-500 bg-white"></i>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className=''  >
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
            <div className="col-span-2 h-screen sticky top-0">
              <div className="bg-white px-5 py-8">
                <Siderbar />
              </div>
            </div>
            <div className="col-span-10">
              <div className="p-8">
                <div className="grid grid-cols-5 gap-4">
                  {"11111111111111111111111111111111111111111111111111111111111111111111".split("").map((item, index) => (
                    <div key={index} className="col-span-1">
                      <CardProduct />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
