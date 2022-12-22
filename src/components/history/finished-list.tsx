import useSWR from "swr";

import FinishedCard from "components/history/finished-card";
import CenteredSpin from "components/common/centered-spin";
import { OrderItem } from "lib/types/order.type";
import { useAppState } from "lib/context/app";

export default function FinishedList({ scrollRef }: any) {
    const [state]: any = useAppState();

    // const apiUrl = `/coffee/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1`;
    const apiUrl = `/coffee/app/order/merchant/631adad4ffc097cd57710311?status=completed&page_size=10&page=1`;

    // const { data, error } = useSWR(`${apiUrl}`, { refreshInterval: 5000 });
    const { data, error } = useSWR(`${apiUrl}`);

    if (error) return null;

    if (!error && !data) return <CenteredSpin />;

    return (
        data &&
        data?.data?.data &&
        data.data.data.items.length > 0 && (
            <>
                {data?.data?.data?.items &&
                    data?.data?.data?.items.map(
                        (item: OrderItem, index: number) => (
                            <FinishedCard
                                key={"completed-" + item._id}
                                id={"completed-" + item._id}
                                scrollRef={
                                    state.navId == "completed-" + item._id
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
