/* eslint-disable jsx-a11y/alt-text */
import Drawer from "react-modern-drawer";
import { useEffect, useState } from "react";
import Camera from "react-html5-camera-photo";

import ButtonComponent from "components/common/button";
import TokiAPI from "lib/api/toki";
import { Remove } from "components/icons";

const emojis = ["👎", "👍"];

export default function Review({
    item,
    showDrawer,
    setShowDrawer,
    type,
    setShowDelivery,
}: any) {
    const commentChoices =
        type === "S"
            ? ["Амт", "Савлагаа", "Хоолны порц"]
            : ["Хугацаа", "Чанар", "Харилцаа"];
    const [liked, setLiked] = useState<any>("");
    const [comment, setComment] = useState<any>([]);
    const [additional, setAdditional] = useState("");
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorComment, setErrorComment] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    async function handleReview() {
        if (comment.length > 0) {
            setErrorComment(false);
            setLoading(true);

            try {
                const response = await TokiAPI.orderReview(item.id, {
                    type: type,
                    liked: liked,
                    comment: comment,
                    additional: additional,
                    pictures: images,
                });

                toggleDrawer();

                response.data.type === "S" &&
                    setShowDelivery &&
                    setShowDelivery(true);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorComment(true);
        }
    }

    function handleTakePhoto(dataUri: any) {
        if (dataUri) {
            setImages([...images, dataUri]);
            setShowCamera(false);
        }
    }

    useEffect(() => {
        if (comment.length > 0) {
            setErrorComment(false);
        }
    }, [comment]);

    function handleChange(event: any) {
        setAdditional(event.target.value);
    }

    const toggleDrawer = () => {
        setLiked("");
        setComment([]);
        setAdditional("");
        setLoading(false);
        setShowDrawer((prevState: any) => !prevState);
    };

    function handleImage() {
        setShowCamera((prevState) => !prevState);
    }

    return (
        <>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction="bottom"
                enableOverlay={true}
                style={{
                    background: "#FFFFFF",
                    height: liked === "" ? "379px" : "687px",
                }}
                overlayOpacity={0.5}
                overlayColor="#1e2335"
                className={`p-5 rounded-t-[20px] relative`}
            >
                <div className="drag-indicator" onTouchEnd={toggleDrawer}></div>
                <div className="rounded-2xl min-h-[160px] overflow-hidden shadow-delivery relative mb-[20px]">
                    <img
                        src={item.merchant.logo}
                        className="h-40 min-w-full"
                        alt={item.merchant.name}
                    />
                    <div className="absolute z-20 left-3.75 bottom-3.75 text-white my-col-5 items-start">
                        <div className="text-sm">{`${item.merchant.name} ( ${item.merchant.distance} км )`}</div>
                    </div>
                </div>

                <div className="font-medium text-center">
                    {type === "S" ? (
                        <>
                            Танд хоолны амт,
                            <div>чанар таалагдсан уу?</div>
                        </>
                    ) : (
                        <>Хүргэлтийн үйлчилгээ таалагдсан уу?</>
                    )}
                </div>
                <div>
                    <div className="flex flex-row justify-center py-5 gap-x-[45px]">
                        {emojis.map((emoji: any, index: any) => (
                            <div
                                key={index}
                                className={`rounded-full${
                                    liked === index
                                        ? " bg-gradient-to-r from-[#ffbe78] to-[#ff7a1f]"
                                        : ""
                                }`}
                                style={{ padding: "2px" }}
                                onClick={() => setLiked(index)}
                            >
                                <div className="rounded-full w-[53px] h-[53px] text-[25px] bg-[#F5F5FA] flex items-center justify-center">
                                    {emoji}
                                </div>
                            </div>
                        ))}
                    </div>

                    {liked !== "" && (
                        <>
                            <div className="font-normal pb-[15px]">
                                {liked === 0
                                    ? "Сайжруулах зүйл нь юу байсан бэ?"
                                    : "Юу нь таалагдсан бэ?"}
                            </div>

                            <div className="flex flex-row justify-between gap-x-[10px]">
                                {commentChoices.map((choice: any) => (
                                    <div
                                        key={choice}
                                        className={`rounded-[10px]${
                                            comment.includes(choice)
                                                ? " bg-gradient-to-r from-[#ffbe78] to-[#ff7a1f]"
                                                : ""
                                        }`}
                                        style={{ padding: "2px" }}
                                        onClick={() => {
                                            if (!comment.includes(choice)) {
                                                setComment([
                                                    ...comment,
                                                    choice,
                                                ]);
                                            } else {
                                                setComment(
                                                    comment.filter(
                                                        (e: any) => e !== choice
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        <div className="rounded-[10px] h-[33px] bg-[#F5F5FA] flex items-center justify-center font-light  px-[15px]">
                                            {choice}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errorComment && (
                                <p className="mt-1 text-xs italic text-left text-red-500">
                                    Сонгоно уу
                                </p>
                            )}

                            <div className="font-normal pb-[15px] pt-[20px]">
                                Нэмэлт санал хүсэлт
                            </div>

                            <input
                                type="text"
                                placeholder="Нэмэлт тайлбар оруулах"
                                className="bg-[#F5F5FA] text-sm font-light rounded-md px-5 py-[9px] w-full h-[35px]"
                                onChange={handleChange}
                            />

                            <div className="mt-[10px] mb-[20px]">
                                <div className="flex flex-wrap flex-row gap-[10px]">
                                    {images.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <img
                                                    onClick={handleImage}
                                                    src={image}
                                                    className="w-[60px] h-[60px] rounded-[10px]"
                                                />
                                                <div
                                                    className="absolute top-[-5px] right-[-5px]"
                                                    onClick={() => {
                                                        setImages(
                                                            images.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <Remove />
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <img
                                        onClick={handleImage}
                                        src="/images/add-photos.png"
                                        className="w-[60px] h-[60px]"
                                    />
                                </div>

                                <div
                                    className={`absolute top-0 left-0 w-full z-max ${
                                        showCamera ? "block" : "hidden"
                                    }`}
                                >
                                    <Camera
                                        isMaxResolution={true}
                                        sizeFactor={1}
                                        onTakePhoto={(dataUri: any) => {
                                            handleTakePhoto(dataUri);
                                        }}
                                        isFullscreen={false}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center w-full">
                                <ButtonComponent
                                    onClick={handleReview}
                                    text="Болсон"
                                    loading={loading}
                                    additionalClass="max-w-[270px] w-full"
                                />
                            </div>
                        </>
                    )}
                </div>
            </Drawer>
        </>
    );
}
