import type { NextPage } from "next";
import { useContext, useState } from "react";
import Drawer from "react-modern-drawer";
import useSWR from "swr";

import Map from "components/map";
import SearchShop from "components/search-shop";
import OfficeNotFound from "components/office/not-found";
import OfficeList from "components/office/office-list";
import Office from "lib/types/office.type";
import TokiAPI from "lib/api/toki";
import { toast } from "react-toastify";

let isMyOffice = false;

const Index: NextPage = () => {
    const [offices, setOffices] = useState<Office[]>([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bySearchbar, setBySearchbar] = useState(false);
    const [height, setHeight] = useState("340px");
    const [maxHeight, setMaxHeight] = useState("45vh");
    const apiUrl = `/coffee/app/office/all`;

    const { data, error } = useSWR(`${apiUrl}`);

    const onSearchSubmit = async (searchValue: string = "") => {
        setLoading(true);

        try {
            const { data } = await TokiAPI.getOfficesByName(
                searchValue.toLowerCase()
            );

            if (data.status_code === 0) {
                setNoResults(data?.data?.length === 0);
                setOffices(data?.data);
            } else {
                toast(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const onSearchByMap = async (lat: number, lon: number) => {
        setBySearchbar(false);
        setLoading(true);

        try {
            const { data } = await TokiAPI.getOfficesByNearby(lat, lon);

            if (data.status_code === 0) {
                setNoResults(data?.data?.length === 0);
                setOffices(data?.data);

                if (!isMyOffice) {
                    isMyOffice = true;

                    let deliveryOptions: any = {};

                    if (typeof window !== "undefined") {
                        deliveryOptions = JSON.parse(
                            localStorage.getItem("deliveryOptions") || "{}"
                        );
                    }

                    data?.data.forEach((office: any) => {
                        if (deliveryOptions.office_id === office._id) {
                            document.getElementById(`${office._id}`)?.click();
                        }
                    });
                }
            } else {
                toast(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => setOffices([]);

    return (
        <>
            <div className="flex flex-1 h-full">
                <SearchShop
                    onSearchSubmit={onSearchSubmit}
                    clearResults={clearResults}
                    offices={offices}
                    loading={loading}
                    bySearchBar={bySearchbar}
                    setBySearchbar={setBySearchbar}
                />

                <Map
                    onSearchByMap={onSearchByMap}
                    offices={data ? data?.data?.data : offices}
                />

                {bySearchbar ? (
                    noResults && (
                        <div className="absolute z-30 mt-20 text-sm text-gray-600 w-100">
                            <div className=" mx-5 bg-white divide-y-[0.5px] rounded-[10px]  px-[15px] py-[15px]">
                                <p className="text-sm text-normal">
                                    Уг байршилд хоол хүргэх үйлчилгээ хараахан
                                    нэвтрээгүй байна
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    // </Drawer>
                    <Drawer
                        open={(offices && offices.length > 0) || noResults}
                        direction="bottom"
                        enableOverlay={false}
                        size={2}
                        style={{
                            height: height,
                            maxHeight: maxHeight,
                            background: "#F5F5FA",
                        }}
                        className={`p-5 rounded-t-[20px] relative`}
                    >
                        {noResults ? (
                            <OfficeList
                                title="Хоол хүргүүлэх боломжтой оффисууд"
                                offices={data ? data?.data?.data : offices}
                                loading={loading}
                                height={height}
                                setHeight={setHeight}
                                setMaxHeight={setMaxHeight}
                            />
                        ) : (
                            <OfficeList
                                title="Хоол хүргүүлэх оффисоо сонгоно уу"
                                offices={offices}
                                loading={loading}
                                height={height}
                                setHeight={setHeight}
                                setMaxHeight={setMaxHeight}
                            />
                        )}
                    </Drawer>
                )}
            </div>
        </>
    );
};

export default Index;
