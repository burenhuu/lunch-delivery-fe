import { withRouter } from "next/router";

import Header from "./header";
import Footer from "./footer";
import {useAppState} from "../../lib/context/app";
import {useEffect, useRef, useState} from "react";

const CartFooterRoutes = ["/office/[officeId]", "/order-history"];

const Page = ({ router, children }: any) => {
    const [state]: any = useAppState();
    const [prevAppState, setPrevAppState] = useState(state);
    const footerPage = CartFooterRoutes.includes(router.pathname);

    useEffect(() => {
        setPrevAppState(state);
    }, [state]);


    return (
        <div className="flex flex-col h-screen bg-[#f5f5fa]">
            <Header routerPathName={router.pathname} />
            <main
                className={`flex-initial overflow-y-scroll scrollbar-hide ${
                    footerPage ? "pb-[59px]" : ""
                } -mt-[25px] bg-inherit h-full page-top-border`}
                style={{
                    WebkitBorderTopLeftRadius: "25px",
                    WebkitBorderTopRightRadius: "25px",
                    overscrollBehaviorY: "none",
                }}
            >
                {children}
            </main>
            {footerPage && state.footerShow ? <Footer routerPathName={router.pathname} />
                :
                <div className="bottom-0 w-full items-center grid grid-cols-2 gap-4 py-2.5 px-5 bg-white rounded-t-[20px] shadow-2xl shadow-black" />
            }
        </div>
    );
};

export default withRouter(Page);
