import useSWR from "swr";

import PendingCard from "components/history/pending-card";
import CenteredSpin from "components/common/centered-spin";
import { OrderItem } from "lib/types/order.type";
import { useAppState } from "lib/context/app";

export default function OngoingList({ scrollRef }: any) {
    const [state]: any = useAppState();

    // const apiUrl = `/coffee/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1`;
    const apiUrl = `/coffee/app/order/merchant/631adad4ffc097cd57710311?status=ongoing&page_size=10&page=1`;

    // const { data, error } = useSWR(`${apiUrl}`, { refreshInterval: 5000 });
    const { data, error } = useSWR(`${apiUrl}`);

    if (error) return null;

    if (!error && !data) return <CenteredSpin />;

    return (
        data &&
        data?.data?.data &&
        data?.data?.data?.items.length > 0 && (
            <>
                {data?.data?.data?.items.map(
                    (item: OrderItem, index: number) => (
                        <PendingCard
                            key={"pending-" + item._id}
                            id={"pending-" + item._id}
                            scrollRef={
                                state.navId == "pending-" + item._id
                                    ? scrollRef
                                    : null
                            }
                            item={item}
                        />
                    )
                )}
            </>
        )
    );
}
