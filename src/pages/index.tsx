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
import Draggable from 'react-draggable';
import OptionCard from "../components/search-shop/option-card";
let isMyOffice = false;

const Index: NextPage = () => {
    const top = innerHeight > 700 ? 0 : 30;
    const mid = innerHeight > 700 ? 375 : 240;
    const bottom = innerHeight > 700 ? 675 : 520;
    const [offices, setOffices] = useState<Office[]>([]);
    const [noResults, setNoResults] = useState(true);
    const [loading, setLoading] = useState(false);
    const [bySearchbar, setBySearchbar] = useState(false);
    const [height, setHeight] = useState("340px");
    const [maxHeight, setMaxHeight] = useState("45vh");
    const { data, error } = useSWR("/v1/offices");
    const [allOffices, setAllOffices] = useState<Office[]>([]);
    const [state, dispatch]: any = useAppState();
    const [deltaPosition, setDeltaPosition] = useState<any>({x: 0, y:mid})
    const [transition, setTransition] = useState<boolean>(false)
    const [clear, setClear] = useState<boolean>(true)
    const handleDrag = (e: any, ui: any) => {
        const {x, y} = deltaPosition;
        setDeltaPosition({
                x: 0,
                y: y + ui.deltaY,

        });
    };

    const handleStop = () => {
        setTransition(true)
        console.log("STOPEED -25 350 650", deltaPosition)
        if(deltaPosition.y > 163 || 500 > deltaPosition.y){
            setDeltaPosition({x: 0, y: mid})
        }
        if(500 < deltaPosition.y){
            setDeltaPosition({x: 0, y: bottom})
        }
        if(163 > deltaPosition.y){
            setDeltaPosition({x: 0, y: top})
        }
    }

    const handleStart = () => {
        setTransition(false)
    }


    useEffect(() => {
        TokiAPI.getAllOffices().then((res) => {
            setAllOffices(res.data);
            if(res.data.length > 0){
                console.log(res.data[0] ? res.data[0].radius : 500)
                dispatch({
                    type: "locationRange",
                    locationRange: res.data[0] ? res.data[0].radius : 500
                });
            }
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
                setClear(false)
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

    const clearResults = () => {
        setOffices([])
        setClear(true)
    };

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
                    setNoResults={setNoResults}
                />

                <Map onSearchByMap={onSearchByMap} offices={allOffices} />

                {bySearchbar ? (
                    noResults && clear && (
                        <div
                            className={`absolute mt-[55px] z-30 flex flex-col justify-center w-full mx-auto`}
                        >
                            <div className="relative grid grid-cols-1 mx-5 mt-2.5 text-sm text-gray-600 bg-white divide-y-[0.5px] rounded-[10px] px-[15px] divide-[#B3BFC6] overflow-y-auto h-[185px]">
                                {data && data.data.map((office: Office, index: number) => {
                                    return(
                                        <OptionCard key={index} office={office}/>
                                    )
                                    })}
                            </div>
                        </div>
                    )
                ) : (
                    <>
                    {noResults
                        ?
                        <div className="absolute z-30 mt-16 text-sm text-gray-600 w-100">
                            <div className=" mx-5 bg-white divide-y-[0.5px] rounded-[10px]  px-[15px] py-[15px]">
                                <p className="text-sm text-normal">
                                    Уг байршилд хоол хүргэх үйлчилгээ хараахан
                                    нэвтрээгүй байна
                                </p>
                            </div>
                        </div>
                        :
                        <Draggable
                            axis="y"
                            bounds={{top: top, bottom: bottom}}
                            position={deltaPosition}
                            onDrag={handleDrag}
                            onStop={handleStop}
                            onStart={handleStart}
                            cancel=".btn"
                        >
                            <div className="p-5" style={{backgroundColor: 'rgb(245, 245, 250)', width: "100%", height: '86vh', position: 'absolute', bottom: 0, transition: `${transition ? 'transform 0.3s' : 'transform 0s'}`}}>
                                {noResults ? (
                                    <OfficeList
                                        title="Хоол хүргүүлэх боломжтой оффисууд"
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
                                        title="Хоол хүргүүлэх оффисоо сонгоно уу"
                                        offices={offices}
                                        // offices={dummyOffices}
                                        loading={loading}
                                        height={height}
                                        setHeight={setHeight}
                                        setMaxHeight={setMaxHeight}
                                    />
                                )}
                            </div>
                        </Draggable>
                    }

                    </>

                )}
            </div>
        </>
    );
};

export default Index;
