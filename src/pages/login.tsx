import LogoImage from "@components/header/logo-image";
import { UserLoginDTO } from "@models/user.model";
import { userActions, userSelector } from "@redux/user.redux";
import { routes } from "@utils/routes";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinner } from "react-spinners-kit";


export default function LoginPage() {

    const router = useRouter()
    const dispatch = useDispatch()

    const { isLoadingLogin, errorsResponse } = useSelector(userSelector)

    const [form, setForm] = useState<UserLoginDTO>(new UserLoginDTO())

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        let temp = { ...form }
        temp[e.target.name] = e.target.value;
        setForm(temp)
    }

    function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(userActions.login(form))
    }


    return (
        <>
            <main className='h-screen flex justify-center items-center'
                style={{
                    backgroundImage: 'url(https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F904%2Fgrocery.png&w=1920&q=75)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="w-full max-w-[400px]  p-3 rounded-md">
                    <form onSubmit={onSubmit}>
                        <div className="flex gap-2 my-6 flex-col items-center">
                            <LogoImage width={200} height={50} />
                            <h3 className="text-xl text-center">
                                Đăng nhập với email và mật khẩu
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Email</label>
                            <div className="flex flex-col">
                                <input onChange={onChange} value={form.email} className="border-2 border-emerald-500 rounded p-2 outline-0 bg-[#fafafa]" type="email" name="email" />
                                {!!errorsResponse['email'] && errorsResponse['email'].map(error => (
                                    <span className="text-sm font-semibold text-red-500 first-letter:uppercase">
                                        {error}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5"></div>
                        <div className="flex flex-col gap-2">
                            <label>Mật khẩu</label>
                            <div className="flex flex-col">
                                <input onChange={onChange} value={form.password} className="border-2 border-emerald-500 rounded p-2 outline-0 bg-[#fafafa]" type="password" name="password" />
                                {!!errorsResponse['password'] && errorsResponse['password'].map(error => (
                                    <span className="text-sm font-semibold text-red-500 first-letter:uppercase">
                                        {error}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded mt-8 text-lg text-white font-semibold transition-all duration-300 flex items-center gap-2 justify-center">
                            Đăng nhập <CircleSpinner size={20} loading={isLoadingLogin} />
                        </button>

                        <div className="my-8 relative">
                            <hr className="border-gray-300" />
                            <h6 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafafa] px-2 ">hoặc</h6>
                        </div>

                        <button onClick={() => router.push(routes.register)} type="button" className="w-full border-2 border-emerald-600 py-2 rounded">
                            Đăng ký
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}