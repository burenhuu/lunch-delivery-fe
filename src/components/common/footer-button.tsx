import { Cart, Menu } from "components/icons";
import React from "react";

export default function FooterButton({ state, type, isActive }: any) {
    return type === "menu" ? (
        <div className="flex flex-col items-center gap-y-1.25">
            <div>{isActive ? <Menu active={true} /> : <Menu />}</div>

            <div className={`text-xs ${!isActive && "text-[#B3BFC6]"}`}>
                Үндсэн цэс
            </div>
        </div>
    ) : type === "order" ? (
        <div className="flex flex-col items-center text-center gap-y-1.25 ">
            <div>{isActive ? <Cart active={true} /> : <Cart />}</div>

            <div className={`text-xs ${!isActive && "text-[#B3BFC6]"}`}>
                Захиалга
            </div>
        </div>
    ) : null;
}
