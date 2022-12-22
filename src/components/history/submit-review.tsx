import GreadientMerchantCard from "components/merchant/gradient-merchant-card";
import ButtonComponent from "components/common/button";
import { AddPhotos } from "components/icons";
import { Merchant } from "lib/types/office.type";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Drawer from "react-modern-drawer";

export default function SubmitReview({ merchant }: { merchant: Merchant }) {
    const [height, setHeight] = useState<string>("380px");
    const [maxHeight, setMaxHeight] = useState<string>("50vh");
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");
    const emojis = ["👎", "👍"];
    const improvements = ["Амт", "Чанар", "Хоолны порц"];
    const [selectedImprovements, setSelectedImprovements] = useState<string[]>(
        []
    );
    const [images, setImages] = useState<any[]>([]);

    const commentRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const onSubmitReview = () => {
        if (imageRef?.current?.files) {
            const formData = new FormData();
            formData.append("review-image", imageRef.current?.files[0]);
        }
    };

    const onImageUpload = () => {
        if (imageRef.current?.files) {
            const image = URL.createObjectURL(imageRef.current.files[0]);
            setImages([...images, image]);
        }
    };

    return (
        <div className="w-full h-full relative">
            <Drawer
                open={true}
                direction="bottom"
                enableOverlay={false}
                size={2}
                style={{
                    height: height,
                    maxHeight: maxHeight,
                }}
                className={`p-5 rounded-t-2.5xl bg-white my-col-20`}
            >
                <div className="absolute bg-white w-[100px] mx-auto h-[5px] rounded-[2.5px] -top-3 left-1/2 -translate-x-1/2"></div>
                <div data-aos="fade-up" className="my-col-20">
                    <div className="rounded-2xl min-h-[160px] overflow-hidden shadow-delivery relative">
                        <img
                            src={merchant.logo}
                            className="h-40 min-w-full"
                            alt={merchant.name}
                        />
                        <div className="absolute z-20 left-3.75 bottom-3.75 text-white my-col-5 items-start">
                            <div className="text-sm">{`${merchant.name} (${merchant.temporary_closed})`}</div>
                        </div>
                        <div className="absolute h-1/2 w-full bg-gradient-to-b bottom-0 left-0 from-main/0 to-main "></div>
                    </div>
                    <div className="font-medium text-center px-20">
                        Танд хоолны амт, чанар таалагдсан уу?
                    </div>
                    <div className="flex justify-center items-center gap-x-[45px]">
                        {emojis.map((emoji) => {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedEmoji(emoji);
                                        setHeight("100%");
                                        setMaxHeight("95vh");
                                    }}
                                    className={
                                        "bg-[#F5F5F5] rounded-full px-3.75 py-[17px] relative " +
                                        (selectedEmoji === emoji &&
                                            "rounded-gradient-border")
                                    }
                                >
                                    <div className="text-[18.2px] leading-[21px]">
                                        {emoji}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-sm  my-col-15">
                        <div>Сайжруулах зүйл нь юу байсан бэ?</div>
                        <div className="flex justify-between items-center w-full gap-x-2.5">
                            {improvements.map((item) => {
                                return (
                                    <div
                                        onClick={() => {
                                            if (
                                                !selectedImprovements.includes(
                                                    item
                                                )
                                            ) {
                                                setSelectedImprovements([
                                                    ...selectedImprovements,
                                                    item,
                                                ]);
                                            } else {
                                                setSelectedImprovements(
                                                    selectedImprovements.filter(
                                                        (improvement) =>
                                                            improvement !== item
                                                    )
                                                );
                                            }
                                        }}
                                        className={
                                            "rounded-md w-full bg-[#F5f5f5] py-[9px]  font-light text-center relative " +
                                            (selectedImprovements.includes(
                                                item
                                            ) && "gradient-border")
                                        }
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="my-col-15">
                        <div>Нэмэлт саналт хүсэлт</div>
                        <div className="my-col-10">
                            <input
                                ref={commentRef}
                                type="text"
                                placeholder="Хүсэлт"
                                className="bg-[#f5f5f5] rounded-md py-[9px] px-5 placeholder:font-light text-sm"
                            />
                            <div className="flex gap-x-2.5 items-center">
                                {images.length > 0 &&
                                    images.map((image) => {
                                        return (
                                            <img
                                                className="w-[60px] h-[60px] rounded-md"
                                                src={image}
                                                alt={image}
                                            />
                                        );
                                    })}
                                <label
                                    htmlFor="review-photo"
                                    className="w-[60px]"
                                >
                                    <AddPhotos />
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="review-photo"
                                        className="hidden"
                                        onChange={onImageUpload}
                                        ref={imageRef}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div onClick={onSubmitReview} className="px-7">
                        <ButtonComponent text="Болсон" />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
