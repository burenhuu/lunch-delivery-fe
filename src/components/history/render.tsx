import { useState } from "react";
import useSWR, { mutate } from "swr";
import PullToRefresh from "react-simple-pull-to-refresh";

import CenteredSpin from "components/common/centered-spin";
import Card from "components/history/card";
import { Status } from "lib/types/order.type";

const finishedStatuses = [Status.COMPLETED, Status.CANCELLED, Status.DELIVERED];
const statusTabs = ["Идэвхтэй", "Дууссан"];
const apiUrl = `/v1/orders`;

const Render = ({ officeId }: any) => {
    const [activeTab, setActiveTab] = useState<string>(statusTabs[0]);
    const { data, error } = useSWR(`${apiUrl}?office=${officeId}`, {
        refreshInterval: 1000,
    });

    const handleRefresh = async () => {
        await mutate(`${apiUrl}?office=${officeId}`);
    };

    return (
        <PullToRefresh
            className="w-full h-full"
            onRefresh={handleRefresh}
            pullingContent=" "
        >
            <div className="p-5 my-col-20">
                <div className="grid items-center grid-cols-2 text-center bg-white rounded-md">
                    {statusTabs?.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={
                                "py-[10.5px] rounded-md transition ease-in-out duration-200 " +
                                (activeTab === tab
                                    ? "text-white font-medium bg-gradient-to-r from-gradient-start to-gradient-end"
                                    : "text-gray")
                            }
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {error ? null : !error && !data ? (
                    <CenteredSpin />
                ) : (
                    data &&
                    data.data &&
                    data.data.length > 0 && (
                        <div className="my-col-10">
                            {activeTab === statusTabs[0] &&
                                data.data
                                    .filter(
                                        (item: any) =>
                                            !finishedStatuses.includes(
                                                item.state
                                            )
                                    )
                                    .map((item: any) => (
                                        <Card
                                            key={`pending-${item.id}`}
                                            item={item}
                                        />
                                    ))}
                            {activeTab === statusTabs[1] &&
                                data.data
                                    .filter((item: any) =>
                                        finishedStatuses.includes(item.state)
                                    )
                                    .map((item: any) => (
                                        <Card
                                            key={`finished-${item.id}`}
                                            item={item}
                                        />
                                    ))}
                        </div>
                    )
                )}
            </div>
        </PullToRefresh>
    );
};

export default Render;
