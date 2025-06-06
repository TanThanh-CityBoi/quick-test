import { Fragment } from 'react';
import Head from 'next/head';

import MainLayout from '../../components/layouts/MainLayout';
import ProductCartWrapper from '../../components/product/ProductCartWrapper';
import Sectors from '../../components/sectors/Sectors';

function HomePage() {
    return (
        <Fragment>
            <Head>
                <title>Home - Nextron</title>
            </Head>
            <div className="h-full py-2">
                <Sectors></Sectors>
                <ProductCartWrapper></ProductCartWrapper>
            </div>
        </Fragment>
    );
}

HomePage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
