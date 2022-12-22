import ButtonComponent from "components/common/button";
import { ImageModal } from "components/common/image-modal";
import { ArrowDown, EditIcon } from "components/icons";
import { useModal } from "lib/context/modal";
import { formatPrice } from "lib/utils/helpers";
import { useContext, useRef, useState } from "react";
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from "react-accessible-accordion";
import { collapseToast } from "react-toastify";

export default function ProductCard({
    product,
    page = false,
}: {
    product: any;
    page?: boolean;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const {
        img,
        title,
        place,
        recipe,
        portions,
        spices,
        oldPrice,
        price,
        avgReview,
        outOfStock,
    } = product;
    const [selectedPortion, setSelectedPortion] = useState<string>(
        portions ? portions[0] : ""
    );
    const [selectedSpice, setSelectedSpice] = useState<string>(
        spices ? spices[0] : ""
    );

    const [show, setShow, content, setContent] = useModal();

    const comment = useRef<HTMLInputElement>(null);

    const onAddClick = () => {
        console.log(selectedPortion, selectedSpice, comment.current?.value);
    };

    const onImageClick = () => {
        setShow(true);
        setContent(<ImageModal images={[img]} />);
    };
    return (
        <AccordionItem className="bg-white rounded-2xl overflow-hidden shadow-delivery">
            <AccordionItemHeading>
                <AccordionItemState>
                    {({ expanded }) => setOpen(expanded!)}
                </AccordionItemState>
                <AccordionItemButton className="flex justify-start gap-x-3.75 ">
                    <div className="relative min-w-[120px] min-h-[120px]">
                        <img
                            onClick={onImageClick}
                            src={`/images/${img}`}
                            className={
                                "w-full h-full " +
                                (open ? "rounded-bl-none" : "rounded-2xl")
                            }
                            alt={title}
                        />
                        <div className="absolute top-0 left-0 w-full h-9 bg-gradient-to-b from-main/75 text-xs text-white to-main/0 rounded-t-2xl p-2.5">
                            👍 {avgReview}%
                        </div>
                        {outOfStock && (
                            <div className="absolute text-shadow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-base text-white">
                                Дууссан
                            </div>
                        )}
                    </div>
                    <div className="py-3.75 pr-5 flex justify-between w-full">
                        <div
                            className={
                                "flex flex-col items-start " +
                                (page
                                    ? "justify-center gap-y-1.25"
                                    : "justify-between")
                            }
                        >
                            <div className="flex flex-col gap-y-1.5">
                                {!page && (
                                    <div className="font-medium">{place}</div>
                                )}
                                <div
                                    className={
                                        page
                                            ? "font-medium text-sm"
                                            : "text-xs "
                                    }
                                >
                                    {title}
                                </div>
                            </div>
                            <div className="flex gap-x-1 items-center">
                                {oldPrice ? (
                                    <>
                                        <div className="font-light text-xs line-through text-gray">
                                            {formatPrice(oldPrice)}₮
                                        </div>
                                        <div className="text-sm">
                                            {formatPrice(price)}₮
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-sm">
                                        {formatPrice(price)}₮
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className={
                                "self-center transition ease-in-out duration-300 " +
                                (open && "rotate-180")
                            }
                        >
                            <ArrowDown />
                        </div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="pt-2.5 px-5 pb-5 my-col-10 text-sm">
                    <div className="my-col-5">
                        <div>Орц:</div>
                        <div className="text-gray font-light text-xs">
                            {recipe}
                        </div>
                    </div>
                    {!outOfStock && (
                        <>
                            {portions && (
                                <div className="my-col-5">
                                    <div>Порц:</div>
                                    <div className="flex gap-x-1.25">
                                        {portions.map((portion: string) => {
                                            return (
                                                <div
                                                    key={portion}
                                                    onClick={() =>
                                                        setSelectedPortion(
                                                            portion
                                                        )
                                                    }
                                                    className={
                                                        "py-2.5 rounded-md w-[75px] text-center relative " +
                                                        (selectedPortion ===
                                                        portion
                                                            ? "gradient-border text-main"
                                                            : "border border-gray text-gray")
                                                    }
                                                >
                                                    {portion}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {spices && (
                                <div className="my-col-5">
                                    <div>Халуун ногоо:</div>
                                    <div className="flex gap-x-1.25">
                                        {spices.map((spice: string) => {
                                            return (
                                                <div
                                                    key={spice}
                                                    onClick={() =>
                                                        setSelectedSpice(spice)
                                                    }
                                                    className={
                                                        "py-2.5 rounded-md w-[75px] text-center relative " +
                                                        (selectedSpice === spice
                                                            ? "gradient-border text-main"
                                                            : "border border-gray text-gray")
                                                    }
                                                >
                                                    {spice}%
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className="my-col-5">
                                <div>Нэмэлт тайлбар:</div>
                                <div className="relative">
                                    <input
                                        ref={comment}
                                        type="text"
                                        placeholder="Нэмэлт тайлбар оруулах"
                                        className="bg-[#F5F5FA] rounded-md w-full  py-[7px] pl-10 pr-5 placeholder:text-gray placeholder:font-light"
                                    />
                                    <div className="absolute left-2.5 top-1.5">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                            <div onClick={onAddClick} className="pt-2.5">
                                <ButtonComponent text="Сагсанд нэмэх" />
                            </div>
                        </>
                    )}
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    );
}
