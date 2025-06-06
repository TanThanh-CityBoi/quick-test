import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { BiShow, BiHide } from 'react-icons/bi';

import PrimaryButton from '@components/ui/button/PrimaryButton';
import InputCustom from '@components/ui/input/input';

type LoginPayload = { username: string; password: string; deviceId: string };

function Login() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const isLogedIn = false;
    const router = useRouter();

    const handleLogin = (values: LoginPayload) => {
        try {
            console.log('Handle login: ', values);
            router.push('/home', '/home');
        } catch (error: any) {
            //
        }
    };

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            username: '',
            password: '',
            deviceId: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is Required'),
            password: Yup.string()
                .required('Password is Required')
                .matches(/^.{6,}$/, 'Password must be minimum 6 characters'),
            deviceId: Yup.string().required('Device id is Required'),
        }),
        onSubmit: (values: LoginPayload) => {
            handleLogin(values);
        },
    });

    useEffect(() => {
        //
    }, [isLogedIn]);

    return (
        <Fragment>
            <Head>
                <title>Sleep Page- Nextron</title>
            </Head>
            <div className="bg-primary-100 h-screen w-full">
                <div className="flex h-[40%] items-end justify-center py-20">
                    <div className="flex items-center">
                        <div className="flex h-40 justify-center">
                            <img src="/images/logo.png" alt="logo.img"></img>
                        </div>
                        <div className="flex items-center justify-center">
                            <h1 className="from-primary-500 to-primary-700 inline-block bg-gradient-to-r bg-clip-text text-center text-transparent">
                                Core<span className="font-bold">Vision</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex h-[60%] items-start justify-center">
                    <div className="flex min-w-[200px] items-center justify-center px-5">
                        <div className="h-max w-[450px] rounded-md border bg-[#FFFFFF] px-8 py-12 opacity-90 shadow-lg">
                            <p className="mb-8 text-center text-xl font-semibold sm:text-2xl">
                                Đăng Nhập
                            </p>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-5">
                                        <InputCustom
                                            placeholder="Tên đăng nhập"
                                            type="text"
                                            onChange={formik.handleChange}
                                            name="username"
                                        ></InputCustom>
                                        {formik.errors.username && formik.touched.username && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.username}
                                            </i>
                                        )}
                                    </div>

                                    <div className="relative mb-5">
                                        <InputCustom
                                            placeholder="Mật khẩu"
                                            type={showPass === true ? 'text' : 'password'}
                                            onChange={formik.handleChange}
                                            name="password"
                                        ></InputCustom>
                                        {formik.errors.password && formik.touched.password && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.password}
                                            </i>
                                        )}
                                        <button
                                            className="absolute right-2 top-3 text-gray-900"
                                            type="button"
                                            onClick={() => setShowPass(!showPass)}
                                        >
                                            {showPass ? <BiShow /> : <BiHide />}
                                        </button>
                                    </div>

                                    <div className="relative mb-12">
                                        <InputCustom
                                            placeholder="Mã thiết bị"
                                            onChange={formik.handleChange}
                                            name="deviceId"
                                        ></InputCustom>
                                        {formik.errors.deviceId && formik.touched.deviceId && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.deviceId}
                                            </i>
                                        )}
                                    </div>

                                    <div className="">
                                        <PrimaryButton
                                            className="w-full justify-center"
                                            content="Đăng Nhập"
                                            type="submit"
                                        ></PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

Login.getLayout = (page) => {
    return <div>{page}</div>;
};

export default Login;
