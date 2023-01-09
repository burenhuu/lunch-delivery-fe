import RiveComponent from "@rive-app/react-canvas";

export default function CenteredSpin({ size = 16 }: any) {
    return size === 16 ? (
        <RiveComponent src="/images/spinner.riv" className={`absolute z-30 w-16 h-16 transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2`} />
    ) : (
        <RiveComponent src="/images/spinner.riv" className={`absolute z-30 w-8 h-8 transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2`} />
    );
}
