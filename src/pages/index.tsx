import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import Drawer from "react-modern-drawer";
import Map from "components/map";
import SearchShop from "components/search-shop";
import OfficeNotFound from "components/office/not-found";
import OfficeList from "components/office/office-list";
import TokiAPI from "lib/api/toki";
import { Office } from "lib/types/office.type";
import { useAppState } from "lib/context/app";
let isMyOffice = false;

const Index: NextPage = () => {
    const [offices, setOffices] = useState<Office[]>([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bySearchbar, setBySearchbar] = useState(false);
    const [height, setHeight] = useState("340px");
    const [maxHeight, setMaxHeight] = useState("45vh");
    const { data, error } = useSWR("/v1/offices");
    const [allOffices, setAllOffices] = useState<Office[]>([]);
    const [state, dispatch]: any = useAppState();

    useEffect(() => {
        TokiAPI.getAllOffices().then((res) => {
            setAllOffices(res.data);
        });

        TokiAPI.getCart().then((res) => {
            dispatch({
                type: "cartCount",
                cartCount:
                    res && res.data && res.data.totalItems
                        ? res.data.totalItems
                        : 0,
            });
            dispatch({
                type: "officeId",
                officeId:
                    res && res.data && res.data.orders[0]
                        ? res.data.orders[0].office.id
                        : 0,
            });
            dispatch({
                type: "officeName",
                officeName:
                    res && res.data && res.data.orders[0]
                        ? res.data.orders[0].office.name
                        : 0,
            });
        });
        dispatch({ type: "footerShow", footerShow: true });
    }, []);

    const onSearchSubmit = async (searchValue: string = "") => {
        setLoading(true);
        try {
            const { data } = await TokiAPI.getOfficesByName(
                searchValue.toLowerCase()
            );
            if (data) {
                setNoResults(data?.length === 0);
                setOffices(data);
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
            setNoResults(data?.length === 0);
            setOffices(data);
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => setOffices([]);

    if (error) return null;

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

                <Map onSearchByMap={onSearchByMap} offices={allOffices} />

                {bySearchbar ? (
                    noResults && (
                        <div className="absolute z-30 mt-16 text-sm text-gray-600 w-100">
                            <div className=" mx-5 bg-white divide-y-[0.5px] rounded-[10px]  px-[15px] py-[15px]">
                                <p className="text-sm text-normal">
                                    ???? ???????????????? ???????? ???????????? ?????????????????? ????????????????
                                    ???????????????????? ??????????
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
                                title="???????? ?????????????????? ?????????????????? ????????????????"
                                offices={data ? data?.data : offices}
                                // offices={offices}
                                // offices={dummyOffices}
                                loading={loading}
                                height={height}
                                setHeight={setHeight}
                                setMaxHeight={setMaxHeight}
                            />
                        ) : (
                            <OfficeList
                                title="???????? ?????????????????? ?????????????? ?????????????? ????"
                                offices={offices}
                                // offices={dummyOffices}
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
