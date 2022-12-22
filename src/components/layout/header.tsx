import { useRouter } from "next/router";
import { useAppState } from "lib/context/app";

const NoBackButtonRoutes = [
    "/office/[officeId]",
    "/product-list/[merchantId]/[categoryId]",
    "/order-history",
];

const Header = ({ routerPathName }: any) => {
    const router = useRouter();
    const [state]: any = useAppState();
    const isBackButton = !NoBackButtonRoutes.includes(routerPathName);
    const { officeId, officeName } = state;

    const onBackButtonClick = () => {
        router.back();
    };

    return (
        <header
            className={`w-full flex h-[77px] text-center text-white bg-gradient-to-r from-gradient-start to-gradient-end overflow-hidden `}
        >
            <div className="w-full h-[50px] px-5 py-2.5 flex justify-start items-center gap-x-2.5">
                {
                    <>
                        {isBackButton && officeId && officeName && (
                            <svg
                                onClick={onBackButtonClick}
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="30"
                                    height="30"
                                    rx="10"
                                    fill="#1E2335"
                                    fillOpacity="0.2"
                                />
                                <rect
                                    x="0.25"
                                    y="0.25"
                                    width="29.5"
                                    height="29.5"
                                    rx="9.75"
                                    stroke="#1E2335"
                                    strokeOpacity="0.2"
                                    strokeWidth="0.5"
                                />
                                <path
                                    d="M6.5 15L13.32 8"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13.32 22L6.5 15"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.5 15H23.5"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        {routerPathName != "/" && officeId && officeName && (
                            <button
                                type="button"
                                className={`flex items-center justify-start px-2.5 py-[5px] gap-x-[5px] h-[30px] text-base text-white rounded-[10px] bg-main/20 border-[0.5px] border-main/20`}
                                onClick={() => {
                                    router.push(`/`);
                                    NoBackButtonRoutes.filter(
                                        (route) => route !== "/"
                                    );
                                }}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.5 7.49998C11.5 7.00552 11.3534 6.52218 11.0787 6.11105C10.804 5.69992 10.4135 5.37949 9.9567 5.19027C9.49988 5.00104 8.99722 4.95159 8.51227 5.04805C8.02732 5.14452 7.58187 5.38263 7.23224 5.73226C6.88261 6.0819 6.6445 6.52735 6.54804 7.0123C6.45157 7.49726 6.50109 7.99995 6.69031 8.45677C6.87953 8.91359 7.19996 9.30403 7.61108 9.57873C8.02221 9.85344 8.50555 10 9 10C9.66304 10 10.2989 9.73666 10.7678 9.26782C11.2366 8.79897 11.5 8.16303 11.5 7.49998V7.49998Z"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9 17.5C7.88 17.5 2 12.6673 2 7.60705C2 5.72214 2.73749 3.91439 4.05024 2.58156C5.36299 1.24873 7.14348 0.5 9 0.5C10.8565 0.5 12.637 1.24873 13.9498 2.58156C15.2625 3.91439 16 5.72214 16 7.60705C16 12.6673 10.1387 17.5 9 17.5Z"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="font-light text-sm">
                                    {officeName}
                                </div>
                            </button>
                        )}
                    </>
                }
            </div>
        </header>
    );
};

export default Header;
