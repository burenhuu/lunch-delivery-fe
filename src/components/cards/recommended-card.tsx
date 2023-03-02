import { LocationIcon } from "components/icons";
import { formatPrice } from "lib/utils/helpers";
import { useRouter } from "next/router";
import { useAppState } from "../../lib/context/app";
import {PermissionBox} from "../common/permission-box";
import {useModal} from "../../lib/context/modal";

export default function Recommended({ data }: { data: any }) {
    const { image, name, rating, price, salePrice, place, productName, placeState, placeStartDate, placeEndDate, placeReason, dayIsActive } = data;
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const [show, setShow, content, setContent] = useModal();

    const onMerchantClick = () => {
        if (placeState === "CLOSED") {
            let text: string
            setShow(true);
            if (dayIsActive){
                text = ` ${place} хаалттай байна. <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                                ${placeStartDate} - ${placeEndDate}
                            </b>`
            } else {
                text = ` ${place} хаалттай байна. <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                                Амарна
                            </b>`
            }
            setContent(
                <PermissionBox
                    text={text}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else if (placeState === "TEMPORARY_CLOSED") {
            setShow(true);
            setContent(
                <PermissionBox
                    text={` Зоогийн газар дотоод ажилтай байгаа тул <br>
                    захиалга авахгүй <br>
                    <b>
                        Нээх цаг: ${placeReason}
                    </b>`}
                />
            );
        } else if (placeState === "preDelivery") {
            setShow(true);
            let text: string
            if (dayIsActive){
                text = ` Уг хоолны газрын нээх цаг болоогүй<br>байгаа тул та зөвхөн урьдчилсан<br>захиалга хийх боломжтой`
            } else {
                text = ` ${place} хаалттай байна. <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                                Амарна
                            </b>`
            }
            setContent(
                <PermissionBox
                    text={text}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else {
            onContinueClick();
        }
    };

    const onContinueClick = () => {
        dispatch({
            type: "merchantId",
            merchantId: data.placeId,
        });
        dispatch({
            type: "merchantName",
            merchantName: data.place,
        });
        // dispatch({
        //     type: "categoryActive",
        //     categoryActive: null,
        // });

        router.push(`/merchant/${data.placeId}?productId=${data.id}&categoryId=${data.categoryMain}`);
    };

    return (
        <div className="rounded-2xl overflow-hidden h-full min-w-[150px] max-w-[150px] bg-white" onClick={onMerchantClick}>
            <img src={image} alt={name} className="w-[150px] h-[100px] rounded-[15px]" />
            <div className="p-2.5 my-col-10">
                <div className="my-col-5">
                    <div className="text-xs truncate text-ellipsis">{productName}</div>
                    {
                        formatPrice(price) === formatPrice(salePrice) ?
                            <div className="font-light flex justify-start gap-x-0.5 items-center">
                                <div className="text-xs">{formatPrice(price)}₮</div>
                            </div>
                            :
                            <div className="font-light flex justify-start gap-x-0.5 items-center">
                                <div className="text-smaller line-through text-gray">
                                    {formatPrice(price)}₮
                                </div>
                                <div className="text-xs">{formatPrice(salePrice)}₮</div>
                            </div>
                    }

                </div>
                <div className="border-b border-gray"></div>
                <div className="my-col-5 text-xs font-light">
                    <div className="flex justify-start items-center gap-x-1.25 truncate text-ellipsis">
                        <LocationIcon />
                        <div>{place}</div>
                    </div>
                    <div>👍{rating}%</div>
                </div>
            </div>
        </div>
    );
}
