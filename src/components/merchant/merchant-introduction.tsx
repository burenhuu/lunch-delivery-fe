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
                className="grid grid-cols-4 divide-x"
            >
                {images?.map((image) => {
                    return (
                        <img
                            key={image}
                            src={image}
                            alt={merchant.name}
                            className="rounded-md h-[87.5px] w-[87.5px]"
                        />
                    );
                })}
            </div>
            <div className="my-col-20 font-light text-justify text-sm">
                <div>{description}</div>
                <div>
                    {phone && <div>Утас: {phone}</div>}
                    {email && <div onClick={()=>{
                        window.location.href = email;
                    }
                    }>Имэйл: {email}</div>}
                    {facebook && <div onClick={() => {
                        window.location.href = facebook;
                    }
                    }>Facebook: {facebook}</div>}
                    {instagram && <div onClick={() => {
                        window.location.href = instagram;
                    }
                    }>Instagram: {instagram}</div>}
                    {website && <div onClick={() => {
                        window.location.href = website;
                    }
                    }>Веб хуудас: {website}</div>}
                </div>
            </div>
        </div>
    );
}
