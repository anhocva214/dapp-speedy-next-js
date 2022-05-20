import LogoImage from '@components/header/logo-image';
import React, { ReactNode } from 'react';

type props = {
    children: ReactNode
}


const MainLayout = (props: props) => {

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
            {props.children}
            
        </>
    )

}

export default MainLayout;