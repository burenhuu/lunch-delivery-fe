// import Lottie from "lottie-react";
// import Loading from "lib/utils/loading.json";
import RiveComponent from "@rive-app/react-canvas";

export default function Spin({ size = 6 }: any) {
    return size === 16 ? (
        <RiveComponent
            src="/images/spinner.riv"
            className={`w-16 h-16  border-solid rounded-full tw-border-t-transparent animate-spin`}
        />
    ) : size === 8 ? (
        <RiveComponent
            src="/images/spinner.riv"
            className={`w-8 h-8  border-solid rounded-full tw-border-t-transparent animate-spin`}
        />
    ) : size === 6 ? (
        <RiveComponent
            src="/images/spinner.riv"
            className={`w-6 h-6 rounded-full tw-border-t-transparent animate-spin`}
        />
    ) : (
        <div
            style={{ borderTopColor: "transparent" }}
            className={`w-6 h-6  border-solid rounded-full tw-border-t-transparent animate-spin`}
        ></div>
    );
}
