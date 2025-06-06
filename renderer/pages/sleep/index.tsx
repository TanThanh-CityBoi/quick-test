import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MdTouchApp } from 'react-icons/md';

function SleepPage() {
    const router = useRouter();
    return (
        <Fragment>
            <Head>
                <title>Sleep Page- Nextron</title>
            </Head>
            <div
                className="bg-primary-100 flex h-screen w-full items-center"
                onClick={() => {
                    router.push('/login', '/login');
                }}
            >
                <div className="w-full py-20">
                    <div className="mb-8 flex h-40 justify-center">
                        <img src="/images/logo.png" alt="logo.img"></img>
                    </div>
                    <div className="flex justify-center">
                        <h1 className="from-primary-500 to-primary-700 inline-block bg-gradient-to-r bg-clip-text text-center text-transparent">
                            Core<span className="font-bold">Vision</span>
                        </h1>
                    </div>

                    <div className="flex justify-center py-40">
                        <MdTouchApp
                            className="text-primary-700 animate-bounce"
                            size={100}
                        ></MdTouchApp>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

SleepPage.getLayout = (page) => {
    return <div>{page}</div>;
};

export default SleepPage;
