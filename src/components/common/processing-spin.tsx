import RiveComponent from "@rive-app/react-canvas";

export default function ProcessingSpin(){
    return(
        <div className={"w-auto h-[76px] flex justify-center items-center"}>
            <RiveComponent src="/images/processing.riv" className={`w-8 h-8`} />
        </div>
    )
}
