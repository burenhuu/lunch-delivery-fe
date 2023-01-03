import { ImageModal } from "components/common/image-modal";
import { useModal } from "lib/context/modal";
import { Merchant } from "lib/types/merchant.type";

export default function MerchantIntroduction({
    merchant,
}: {
    merchant: Merchant;
}) {
    const [show, setShow, content, setContent] = useModal();
    const { images, description, instagram, website, facebook, email, phone } =
        merchant;

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
                            key={image}
                            src={image}
                            alt={merchant.name}
                            className="w-[83px] h-[83px] rounded-md"
                        />
                    );
                })}
            </div>
            <div className="my-col-20 font-light text-justify text-sm">
                <div>{description}</div>
                <div>
                    {phone && <div>Утас: {phone}</div>}
                    {email && <div>Имэйл: {email}</div>}
                    {facebook && <div>Facebook: {facebook}</div>}
                    {instagram && <div>Instagram: {instagram}</div>}
                    {website && <div>Веб хуудас: {website}</div>}
                </div>
            </div>
        </div>
    );
}
