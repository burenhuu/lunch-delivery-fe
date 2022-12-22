import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { Slide, ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";

import "styles/globals.css";
import Page from "components/layout/page";
import WithAuth from "lib/hoc/with-auth";
import AppProvider from "lib/context/app";
import { ModalProvider } from "lib/context/modal";
import fetcher from "lib/utils/axios";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        AOS.init({ disable: innerHeight < 400 });
    }, []);
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
                />

                <title>Toki Delivery</title>
            </Head>

            <WithAuth>
                <SWRConfig
                    value={{
                        refreshInterval: 0,
                        revalidateOnFocus: false,
                        shouldRetryOnError: false,
                        fetcher,
                    }}
                >
                    <AppProvider>
                        <ModalProvider>
                            <Page>
                                <Component {...pageProps} />
                                <ToastContainer
                                    transition={Slide}
                                    newestOnTop={true}
                                    position={"bottom-center"}
                                    limit={1}
                                    closeOnClick
                                    autoClose={1000}
                                    hideProgressBar={true}
                                    pauseOnHover={false}
                                    closeButton={false}
                                />
                            </Page>
                        </ModalProvider>
                    </AppProvider>
                </SWRConfig>
            </WithAuth>
        </>
    );
};

export default MyApp;
