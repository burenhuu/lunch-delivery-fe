import { withRouter } from "next/router";

import Header from "./header";
import Footer from "./footer";

const CartFooterRoutes = ["/office/[officeId]", "/order-history"];

const Page = ({ router, children }: any) => {
    const footerPage = CartFooterRoutes.includes(router.pathname);

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

            {footerPage && <Footer routerPathName={router.pathname} />}
        </div>
    );
};

export default withRouter(Page);
