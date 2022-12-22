import Lottie from "lottie-react";
import Border from "lib/utils/border.json";

export default function FoodBorder() {
    return (
        <Lottie
            animationData={Border}
            loop={true}
            className="absolute z-30 w-[55px] h-[55px] left-0 top-0"
        />
    );
}
