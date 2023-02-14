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
                            className="rounded-md"
                        />
                    );
                })}
            </div>
            <div className="my-col-20 font-light text-justify text-sm">
                <div>{description}</div>
                <div>
                    {phone && <div>Утас: {phone}</div>}
                    {email && <div>Имэйл: <a href={email ? email : ''}>{email}</a></div>}
                    {facebook && <div>Facebook: <a href={facebook ? facebook : ''}>{facebook}</a></div>}
                    {instagram && <div>Instagram: <a href={instagram ? instagram : ''}>{instagram}</a></div>}
                    {website && <div>Веб хуудас: <a href={website ? website : ''}>{website}</a></div>}
                </div>
            </div>
        </div>
    );
}
