import Link from "next/link";
import { useRouter } from "next/router";

import FooterButton from "components/common/footer-button";
import { useAppState } from "lib/context/app";

const Footer = ({ routerPathName }: any) => {
    const [state]: any = useAppState();
    const router = useRouter();
    const { merchantId } = router.query;

    return (
        <footer className="fixed z-30 bottom-0 w-full items-center grid grid-cols-2 gap-4 py-2.5 px-5 bg-white rounded-t-[20px] shadow-2xl shadow-black">
            {
                <>
                    <Link href={`/office/${state.officeId}`}>
                        <div>
                            <FooterButton
                                state={state}
                                type="menu"
                                isActive={
                                    routerPathName === "/office/[officeId]"
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </Link>
                    <Link href={`/order-history`}>
                        <div>
                            <FooterButton
                                state={state}
                                type="order"
                                isActive={
                                    routerPathName == "/order-history" ||
                                    routerPathName ==
                                        "/order-history/notification/review" ||
                                    routerPathName ==
                                        "/order-history/notification/jump"
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </Link>
                </>
            }
        </footer>
    );
};

export default Footer;
