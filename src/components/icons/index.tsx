export function Menu({ active = false }: { active?: boolean }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.08 20C13.7451 19.9987 13.4138 19.9314 13.1049 19.8021C12.7961 19.6727 12.5157 19.4838 12.2798 19.2461C12.044 19.0083 11.8572 18.7265 11.7303 18.4166C11.6034 18.1067 11.5387 17.7749 11.54 17.44V14C11.5374 13.3254 11.8021 12.6773 12.2763 12.1975C12.7505 11.7177 13.3955 11.4453 14.07 11.44H17.47C17.8044 11.4413 18.1353 11.5086 18.4436 11.6381C18.7519 11.7676 19.0316 11.9567 19.2667 12.1945C19.5018 12.4324 19.6875 12.7143 19.8134 13.0242C19.9392 13.334 20.0027 13.6656 20 14V17.41C20.0053 17.7474 19.9436 18.0825 19.8184 18.3958C19.6933 18.7092 19.5072 18.9946 19.2709 19.2355C19.0347 19.4764 18.753 19.668 18.4421 19.7992C18.1313 19.9305 17.7974 19.9987 17.46 20H14.08ZM2.54002 20C2.20515 19.9987 1.87381 19.9314 1.56494 19.8021C1.25606 19.6727 0.975682 19.4838 0.739821 19.2461C0.503959 19.0083 0.31723 18.7265 0.190295 18.4166C0.0633595 18.1067 -0.00129611 17.7749 1.96863e-05 17.44V14C-0.00129611 13.6651 0.0633595 13.3333 0.190295 13.0234C0.31723 12.7135 0.503959 12.4317 0.739821 12.1939C0.975682 11.9562 1.25606 11.7673 1.56494 11.6379C1.87381 11.5086 2.20515 11.4413 2.54002 11.44H5.92002C6.25527 11.44 6.5872 11.5063 6.89668 11.6352C7.20615 11.7641 7.48705 11.953 7.72318 12.191C7.9593 12.429 8.14598 12.7114 8.27244 13.0218C8.39891 13.3323 8.46266 13.6648 8.46002 14V17.42C8.46398 17.7565 8.40128 18.0905 8.27553 18.4027C8.14978 18.7149 7.96347 18.9992 7.72735 19.239C7.49123 19.4788 7.20996 19.6696 6.89976 19.8002C6.58957 19.9308 6.25659 19.9987 5.92002 20H2.54002ZM14.08 8.53C13.4081 8.53 12.7636 8.26377 12.2875 7.78959C11.8114 7.31541 11.5427 6.67192 11.54 6V2.56C11.5387 2.22513 11.6034 1.89328 11.7303 1.58339C11.8572 1.27351 12.044 0.991662 12.2798 0.753943C12.5157 0.516225 12.7961 0.327291 13.1049 0.197929C13.4138 0.068567 13.7451 0.00131065 14.08 0L17.46 0C17.7949 0.00131065 18.1262 0.068567 18.4351 0.197929C18.744 0.327291 19.0244 0.516225 19.2602 0.753943C19.4961 0.991662 19.6828 1.27351 19.8097 1.58339C19.9367 1.89328 20.0013 2.22513 20 2.56V6C20.0027 6.67458 19.7379 7.32273 19.2638 7.80254C18.7896 8.28235 18.1446 8.55472 17.47 8.56H14.08V8.53ZM2.54002 8.53C1.8689 8.52739 1.22587 8.26031 0.750379 7.78669C0.274889 7.31308 0.00527831 6.6711 1.96863e-05 6V2.56C-0.00129611 2.22513 0.0633595 1.89328 0.190295 1.58339C0.31723 1.27351 0.503959 0.991662 0.739821 0.753943C0.975682 0.516225 1.25606 0.327291 1.56494 0.197929C1.87381 0.068567 2.20515 0.00131065 2.54002 0L5.92002 0C6.25489 0.00131065 6.58623 0.068567 6.8951 0.197929C7.20398 0.327291 7.48436 0.516225 7.72022 0.753943C7.95608 0.991662 8.14281 1.27351 8.26974 1.58339C8.39668 1.89328 8.46134 2.22513 8.46002 2.56V6C8.45741 6.66847 8.19139 7.30895 7.71964 7.78257C7.2479 8.25618 6.60847 8.52474 5.94002 8.53H2.54002Z"
                fill="url(#paint0_linear_1045_920)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1045_920"
                    x1="0"
                    y1="0"
                    x2="20"
                    y2="20"
                    gradientUnits="userSpaceOnUse"
                >
                    {active ? (
                        <>
                            <stop stopColor="#FFBE78" />
                            <stop offset="1" stopColor="#FF7A1F" />
                        </>
                    ) : (
                        <>
                            <stop stopColor="#B3BFC6" stopOpacity="0" />
                            <stop offset="1" stopColor="#B3BFC6" />
                        </>
                    )}
                </linearGradient>
            </defs>
        </svg>
    );
}

export function Cart({ active = false }: { active?: boolean }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.1177 18.4601C15.1217 18.1604 15.2139 17.8685 15.3829 17.6212C15.5519 17.3739 15.7901 17.1822 16.0675 17.0702C16.345 16.9582 16.6492 16.9309 16.942 16.9918C17.2349 17.0527 17.5032 17.199 17.7133 17.4124C17.9234 17.6257 18.0658 17.8966 18.1228 18.1909C18.1797 18.4852 18.1485 18.7898 18.0332 19.0663C17.9178 19.3429 17.7235 19.5791 17.4745 19.7453C17.2256 19.9115 16.9332 20.0001 16.6342 20.0001C16.2302 19.9949 15.8445 19.8303 15.5606 19.5421C15.2768 19.2538 15.1177 18.8651 15.1177 18.4601ZM3.91405 18.4601C3.91995 18.1628 4.01329 17.8739 4.18236 17.6296C4.35143 17.3852 4.58872 17.1964 4.86445 17.0867C5.14019 16.977 5.4421 16.9513 5.73233 17.0129C6.02255 17.0745 6.28817 17.2206 6.49587 17.433C6.70357 17.6453 6.8441 17.9144 6.89984 18.2064C6.95559 18.4985 6.92406 18.8005 6.80921 19.0747C6.69436 19.3489 6.50131 19.583 6.25426 19.7476C6.00722 19.9122 5.71718 20.0001 5.42051 20.0001C5.01742 19.9949 4.63277 19.83 4.35053 19.5415C4.06829 19.2529 3.91138 18.8642 3.91405 18.4601ZM5.59012 15.2901C4.94721 15.2936 4.3282 15.0462 3.86417 14.6001C3.39314 14.154 3.105 13.5479 3.05607 12.9001L2.13823 1.78014L0.631767 1.52014C0.532029 1.5021 0.436838 1.46445 0.351679 1.40937C0.26652 1.35429 0.193077 1.28286 0.135581 1.19921C0.0780844 1.11555 0.037672 1.02131 0.0166718 0.921929C-0.00432839 0.822546 -0.00550125 0.71998 0.0132208 0.620141C0.0483136 0.442861 0.144503 0.283604 0.284946 0.170254C0.425389 0.0569038 0.601137 -0.00331509 0.781416 0.000140893H0.891158L3.26558 0.380141C3.43095 0.408945 3.58186 0.492646 3.69404 0.617791C3.80623 0.742936 3.87317 0.902255 3.88412 1.07014L4.07368 3.36014C4.08823 3.51323 4.15815 3.65569 4.27025 3.76069C4.38234 3.86568 4.52888 3.92595 4.68225 3.93014H18.1406C18.4123 3.92221 18.6819 3.97985 18.9267 4.09819C19.1715 4.21653 19.3844 4.39211 19.5473 4.61014C19.7328 4.85959 19.8656 5.1443 19.9376 5.4469C20.0096 5.7495 20.0194 6.06363 19.9663 6.37014L18.9687 13.0601C18.8869 13.6744 18.5864 14.2384 18.1226 14.6482C17.6588 15.058 17.0629 15.2859 16.4446 15.2901H5.59012ZM11.3566 8.47014C11.3552 8.56947 11.3736 8.66807 11.4106 8.76023C11.4476 8.85238 11.5025 8.93624 11.5722 9.00695C11.6418 9.07765 11.7247 9.13379 11.8161 9.17211C11.9076 9.21042 12.0057 9.23015 12.1048 9.23014H14.8583C15.0457 9.20863 15.2187 9.11878 15.3442 8.97771C15.4697 8.83663 15.5391 8.65419 15.5391 8.46514C15.5391 8.27609 15.4697 8.09365 15.3442 7.95258C15.2187 7.8115 15.0457 7.72165 14.8583 7.70014H12.1048C11.9064 7.70014 11.716 7.77916 11.5757 7.91981C11.4354 8.06046 11.3566 8.25123 11.3566 8.45014V8.47014Z"
                fill="url(#paint0_linear_1045_925)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1045_925"
                    x1="2.26992e-07"
                    y1="0.00012182"
                    x2="20"
                    y2="20.0001"
                    gradientUnits="userSpaceOnUse"
                >
                    {active ? (
                        <>
                            <stop stopColor="#FFBE78" />
                            <stop offset="1" stopColor="#FF7A1F" />
                        </>
                    ) : (
                        <>
                            <stop stopColor="#B3BFC6" stopOpacity="0" />
                            <stop offset="1" stopColor="#B3BFC6" />
                        </>
                    )}
                </linearGradient>
            </defs>
        </svg>
    );
}

export function FilterIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.99989 4.01137C4.01132 2.91426 3.11992 2 2.01137 2C0.914261 2 0 2.87998 0 3.98852C0 5.09706 0.879976 5.99989 1.98852 5.99989H1.99995C3.09706 5.99989 3.99989 5.11992 3.99989 4.01137Z"
                fill="#647382"
            />
            <path
                d="M11 10.9886C11 12.0971 11.88 13 12.9886 13C14.0971 13 15 12.12 15 11.0114C15 9.90286 14.12 9 13.0114 9H13C11.9029 9 11 9.88 11 10.9886Z"
                fill="#647382"
            />
            <path
                d="M7.5 4H14.5"
                stroke="#647382"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 11H0.5"
                stroke="#647382"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ClockIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.5 7.5C14.5 8.88447 14.0895 10.2379 13.3203 11.389C12.5511 12.5401 11.4579 13.4373 10.1788 13.9672C8.89968 14.497 7.49226 14.6356 6.13439 14.3655C4.77652 14.0954 3.52924 13.4287 2.55028 12.4498C1.57131 11.4708 0.904605 10.2235 0.634509 8.86561C0.364412 7.50774 0.503027 6.10032 1.03284 4.82124C1.56265 3.54216 2.45986 2.44893 3.611 1.67976C4.76215 0.910581 6.11554 0.5 7.5 0.5C9.35652 0.5 11.137 1.23747 12.4497 2.55022C13.7625 3.86298 14.5 5.64348 14.5 7.5Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3054 9.89184L7.24865 8.06752V4.13501"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function LocationIcon() {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.5 3.99999C6.5 3.70331 6.41203 3.41331 6.2472 3.16663C6.08238 2.91995 5.84811 2.72769 5.57402 2.61416C5.29993 2.50063 4.99833 2.47095 4.70736 2.52883C4.41639 2.58671 4.14912 2.72958 3.93934 2.93936C3.72957 3.14914 3.5867 3.41641 3.52882 3.70738C3.47094 3.99836 3.50065 4.29997 3.61419 4.57406C3.72772 4.84816 3.91998 5.08242 4.16665 5.24724C4.41332 5.41206 4.70333 5.5 5 5.5C5.39783 5.5 5.77935 5.342 6.06066 5.06069C6.34196 4.77938 6.5 4.39782 6.5 3.99999V3.99999Z"
                stroke="#1E2335"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 9.6501C4.4 9.6501 1.25 7.00631 1.25 4.23807C1.25 3.20692 1.64508 2.21797 2.34834 1.48884C3.0516 0.759699 4.00544 0.350098 5 0.350098C5.99456 0.350098 6.9484 0.759699 7.65166 1.48884C8.35492 2.21797 8.75 3.20692 8.75 4.23807C8.75 7.00631 5.61 9.6501 5 9.6501Z"
                stroke="#1E2335"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function Oops() {
    return (
        <svg
            width="101"
            height="110"
            viewBox="0 0 101 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M70.8545 12.54C73.9031 12.54 76.3745 10.0686 76.3745 7.02C76.3745 3.97139 73.9031 1.5 70.8545 1.5C67.8059 1.5 65.3345 3.97139 65.3345 7.02C65.3345 10.0686 67.8059 12.54 70.8545 12.54Z"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M31.8643 7.14001L37.4843 12.76"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M37.4843 7.14001L31.8643 12.76"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M50.4643 70.98L66.1543 75.71L98.1843 58.85C99.3543 58.23 99.2343 56.52 97.9943 56.07L86.0043 51.77L50.4543 70.98H50.4643Z"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M50.4644 70.98L34.7544 75.71L2.72442 58.67C1.68442 58.12 1.78442 56.6 2.89442 56.19L14.9044 51.77L50.4544 70.98H50.4644Z"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M58.4944 27.45L50.4644 35.36L86.0144 51.77L98.1344 39.25L84.4244 32.8499"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M77.0343 29.4001L66.1743 24.3201"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M30.4943 26.81L38.0343 23.37L50.4643 35.36L14.9143 51.77L2.44434 39.61L22.6843 30.37"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M86.0144 65.22V89.29L50.4644 108.5V70.98"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.9146 81.26V89.29L50.4646 108.5V70.98"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.9146 65.11V72.1"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M59.3245 94.6L64.7345 91.7"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M61.3042 28.33C64.0436 28.33 66.2642 26.1094 66.2642 23.37C66.2642 20.6307 64.0436 18.41 61.3042 18.41C58.5649 18.41 56.3442 20.6307 56.3442 23.37C56.3442 26.1094 58.5649 28.33 61.3042 28.33Z"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M24.8843 30.79C28.1704 30.79 30.8343 28.1261 30.8343 24.84C30.8343 21.5539 28.1704 18.89 24.8843 18.89C21.5982 18.89 18.9343 21.5539 18.9343 24.84C18.9343 28.1261 21.5982 30.79 24.8843 30.79Z"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M80.9844 18.0601L86.6044 23.6701"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M86.6044 18.0601L80.9844 23.6701"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36.6344 63.5099C35.7444 61.5699 35.2444 59.4099 35.2444 57.1399C35.2444 48.7399 42.0544 41.9199 50.4644 41.9199C58.8744 41.9199 65.6844 48.7299 65.6844 57.1399C65.6844 59.4099 65.1844 61.5699 64.2944 63.5099"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M47.1245 61.83C49.3045 60.17 51.5245 60.17 53.7945 61.83"
                stroke="#B3BFC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M43.55 57.1C42.72 57.1 42 56.38 42 55.55C42 54.72 42.72 54 43.55 54C44.38 54 45.1 54.72 45.1 55.55C45.1 56.38 44.38 57.1 43.55 57.1Z"
                fill="#B3BFC6"
            />
            <path
                d="M57.3698 57.1C56.5398 57.1 55.8198 56.38 55.8198 55.55C55.8198 54.72 56.5398 54 57.3698 54C58.1998 54 58.9198 54.72 58.9198 55.55C58.9198 56.38 58.1998 57.1 57.3698 57.1Z"
                fill="#B3BFC6"
            />
        </svg>
    );
}

export function ArrowDown() {
    return (
        <svg
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.5 7.5L0.5 0.5"
                stroke="#1E2335"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M14.5 0.5L7.5 7.5"
                stroke="#1E2335"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function EditIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.70401 1.50126C10.4446 0.623345 11.7473 0.497929 12.6396 1.21459L14.2724 2.48668C15.2271 3.05105 15.5484 4.29626 14.9862 5.2548C14.9862 5.2548 14.9684 5.29063 14.9595 5.30855C14.9238 5.3623 5.98326 16.605 5.98326 16.605C5.67989 16.9813 5.22483 17.2052 4.74301 17.2052L1.31671 17.25L0.540435 13.9623C0.433363 13.4965 0.540435 13.0127 0.843806 12.6365L9.70401 1.50126Z"
                stroke="#647382"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.2395 3.35437L13.3842 7.29653"
                stroke="#647382"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10.7896 17.25H17.5001"
                stroke="#647382"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function LongArrow() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.25 7.5H0.75"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.75 3L14.25 7.5L9.75 12"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function SearchXIcon() {
    return (
        <svg
            width="30"
            height="35"
            viewBox="0 0 30 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.5 22L10.5 13"
                stroke="#647382"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M19.5 13L10.5 22"
                stroke="#647382"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function NavigateArrow() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.2501 14.25L1.00024 1"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.00006 0.75L0.750244 0.75L0.750244 8.99999"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function CloseButton() {
    return (
        <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.5 10L0.5 1"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.5 1L0.5 10"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function HomeIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.33089 15.2929V12.9139C6.33089 12.3123 6.8109 11.8201 7.41771 11.811H9.61852C10.2253 11.811 10.7144 12.3032 10.7144 12.9139V15.2929C10.7144 15.8034 11.122 16.2318 11.6291 16.2409H13.0963C14.5545 16.2409 15.7409 15.0559 15.75 13.5793V6.82513C15.75 6.25088 15.4692 5.70398 15.0164 5.35762L9.98985 1.28323C9.11134 0.572258 7.86149 0.572258 6.98298 1.28323L1.9836 5.35762C1.53076 5.7131 1.25906 6.25088 1.25 6.83424V13.5884C1.25 15.0559 2.43645 16.25 3.8946 16.25H5.36181C5.8871 16.25 6.30372 15.8216 6.31277 15.302"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function Remove() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#FFBE78" />
            <line
                x1="10.75"
                y1="7.5"
                x2="4.25"
                y2="7.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    );
}

export function Add() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#FF7A1F" />
            <line
                x1="10.75"
                y1="7.5"
                x2="4.25"
                y2="7.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
            />
            <line
                x1="7.5"
                y1="10.75"
                x2="7.5"
                y2="4.25"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    );
}

export function CallIcon() {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="40" height="40" rx="10" fill="#F5F5FA" />
            <path
                d="M19.5323 20.4777C23.5231 24.4685 24.4232 19.8476 26.9638 22.3881C29.4142 24.8386 30.8245 25.3287 27.7139 28.4293C27.3238 28.7394 24.8533 32.5001 16.1816 23.8284C7.50985 15.1467 11.2606 12.6762 11.5707 12.2861C14.6813 9.17548 15.1614 10.5858 17.6119 13.0362C20.1524 15.5768 15.5415 16.4869 19.5323 20.4677V20.4777Z"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M22.5 14C24.27 14.34 25.66 15.73 26 17.5"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M22.5 10.5C26.179 10.9083 29.0824 13.8158 29.5 17.5"
                stroke="#1E2335"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export function AddPhotos() {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="1"
                y="1"
                width="60"
                height="60"
                rx="10"
                stroke="#647382"
                stroke-linecap="round"
                stroke-dasharray="5 5"
            />
            <path
                d="M33 43.5H17.3043C15.4787 43.5 14 42.0083 14 40.1667V21.8333C14 19.9917 15.4787 18.5 17.3043 18.5H21.0465"
                stroke="#647382"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M32 18.5L44.6316 18.5C46.4926 18.5 48 19.9917 48 21.8333V31"
                stroke="#647382"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M22.5 15H30.5"
                stroke="#647382"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M31 37.25C34.4518 37.25 37.25 34.4518 37.25 31C37.25 27.5482 34.4518 24.75 31 24.75C27.5482 24.75 24.75 27.5482 24.75 31C24.75 34.4518 27.5482 37.25 31 37.25Z"
                stroke="#647382"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M42 26.5C43.1046 26.5 44 25.6046 44 24.5C44 23.3954 43.1046 22.5 42 22.5C40.8954 22.5 40 23.3954 40 24.5C40 25.6046 40.8954 26.5 42 26.5Z"
                fill="#F45844"
            />
            <path
                d="M44 35.5V43.5"
                stroke="#F45844"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
            <path
                d="M48 39.5H40"
                stroke="#F45844"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
        </svg>
    );
}

export function UpointGreen() {
    return (
        <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V9.5C0.5 10.0523 0.947715 10.5 1.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V1.5C10.5 0.947715 10.0523 0.5 9.5 0.5Z"
                stroke="#78C81E"
                stroke-miterlimit="10"
            />
            <path
                d="M2.5 6C2.5 6 3.2 8 5.5 8C7.8 8 8.5 6 8.5 6"
                stroke="#78C81E"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
        </svg>
    );
}

export function Upoint() {
    return (
        <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V9.5C0.5 10.0523 0.947715 10.5 1.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V1.5C10.5 0.947715 10.0523 0.5 9.5 0.5Z"
                stroke="#1E2335"
                stroke-miterlimit="10"
            />
            <path
                d="M2.5 6C2.5 6 3.2 8 5.5 8C7.8 8 8.5 6 8.5 6"
                stroke="#1E2335"
                stroke-miterlimit="10"
                stroke-linecap="round"
            />
        </svg>
    );
}
