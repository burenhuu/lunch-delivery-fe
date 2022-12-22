import Lottie from "lottie-react";
import Loading from "lib/utils/loading.json";

export default function CenteredSpin({ size = 16 }: any) {
    return size === 16 ? (
        <Lottie
            animationData={Loading}
            loop={true}
            className={`absolute z-30 w-16 h-16 transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2`}
        />
    ) : (
        <Lottie
            animationData={Loading}
            loop={true}
            className={`absolute z-30 w-8 h-8 transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2`}
        />
    );
}
