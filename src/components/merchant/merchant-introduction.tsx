import { ImageModal } from "components/common/image-modal";
import { useModal } from "lib/context/modal";
import { Merchant } from "lib/types/office.type";

export default function MerchantIntroduction({
    merchant,
}: {
    merchant: Merchant;
}) {
    const [show, setShow, content, setContent] = useModal();
    const images = [
        "placeholder.png",
        "placeholder.png",
        "placeholder.png",
        "placeholder.png",
        "placeholder.png",
    ];

    const onImageClick = () => {
        setShow(true);
        setContent(<ImageModal images={images} />);
    };
    return (
        <div className="my-col-15">
            <div className="font-medium">Танилцуулга</div>
            <div
                onClick={onImageClick}
                className="flex gap-x-[1px] overflow-x-scroll scrollbar-hide -mx-5 px-5"
            >
                {images?.map((image) => {
                    return (
                        <img
                            src={`${merchant.logo}`}
                            alt={merchant.name}
                            className="w-[83px] h-[83px] rounded-md"
                        />
                    );
                })}
            </div>
            <div className="my-col-20 font-light text-justify text-sm">
                <div>
                    Өдөр болгон шинэ махаар эрүүл цэвэрхэн орчинд бэлтгэсэн
                    Монгол үндэсний хоолоор үйлчилж байна
                </div>
                <div>
                    {merchant.contact_number && (
                        <div>Утас: {merchant.contact_number}</div>
                    )}
                    <div>Утас: 77001234</div>
                    <div>Имэйл: info@domain.name</div>
                    <div>Facebook: @facebook.id </div>
                    <div>Instagram: @instagram.id</div>
                    <div>Веб хуудас: www.domain.name</div>
                </div>
            </div>
        </div>
    );
}
