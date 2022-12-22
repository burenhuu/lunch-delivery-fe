import React, { useContext } from "react";
import {
    Circle,
    GoogleMap,
    Marker,
    useLoadScript,
} from "@react-google-maps/api";
import { GeolocatedProps, geolocated } from "react-geolocated";
import Office, { Merchant } from "lib/types/office.type";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";

const containerStyle = {
    width: "100%",
    height: "100%",
    zIndex: "0",
    WebkitBorderTopLeftRadius: "25px",
    WebkitBorderTopRightRadius: "25px",
};

const defaultMapOptions = {
    fullscreenControl: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    scaleControl: false,
    rotateControl: false,
    scrollwheel: false,
    keyboardShortcuts: false,
    clickableIcons: false,
    gestureHandling: "greedy",
};

const defaultCenter = { lat: 47.918834727241986, lng: 106.91761437300136 };

interface MapProps {
    onSearchByMap(lat: number, lon: number): void;
    offices: Office[];
}
const options = {
    strokeWeight: 0,
    fillColor: "#ffc800",
    fillOpacity: 0.25,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
    ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
    : "";

const Map: React.FC<MapProps & GeolocatedProps> = ({
    onSearchByMap,
    offices,
    coords,
}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
    });
    const [center, setCenter] = React.useState({
        lat: 47.917183173166144,
        lng: 106.91973505828838,
    });
    const [map, setMap] = React.useState<any>(null);
    const [state, dispatch]: any = useAppState();
    // const { handleModal }: any = useContext(ModalContext);

    React.useEffect(() => {
        if (coords && map) {
            const lat = coords.latitude;
            const lng = coords.longitude;
            map.panTo(new window.google.maps.LatLng(lat, lng));
            setCenter({ lat, lng });
            onSearchByMap(map.getCenter().lat(), map.getCenter().lng());
        }
    }, [coords, map]); // eslint-disable-line react-hooks/exhaustive-deps

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    const handleBoundsChanged = () => {
        if (map) {
            setCenter(map.getCenter());
        }
    };

    const onMarkerDragEnd = () => {
        onSearchByMap(map.getCenter().lat(), map.getCenter().lng());
    };

    const router = useRouter();

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            center={defaultCenter}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultMapOptions}
            onBoundsChanged={handleBoundsChanged}
            onDragEnd={onMarkerDragEnd}
        >
            <Marker
                position={center}
                draggable={false}
                icon={{
                    url: "/images/map-pin.png",
                    scaledSize: new google.maps.Size(16, 16),
                    anchor: new google.maps.Point(8, 8),
                }}
            />
            <Circle
                center={center}
                radius={parseFloat(
                    localStorage.getItem("locationRange")
                        ? localStorage.getItem("locationRange")?.toString()!
                        : "500"
                )}
                options={options}
            />
            {offices?.map((office: Office, index: number) => (
                <Marker
                    key={index}
                    position={{
                        lat: Number(office.latitude),
                        lng: Number(office.longitude),
                    }}
                    icon={{
                        // url: office.pin_icon,
                        url: "/images/Pin.svg",
                        scaledSize: new google.maps.Size(24, 34),
                        anchor: new google.maps.Point(24, 34),
                    }}
                    onClick={() => (
                        setCenter({
                            lat: Number(office.latitude),
                            lng: Number(office.longitude),
                        }),
                        onSearchByMap(
                            Number(office.latitude),
                            Number(office.longitude)
                        ),
                        map.panTo(
                            new window.google.maps.LatLng(
                                Number(office.latitude),
                                Number(office.longitude)
                            )
                        ),
                        dispatch({
                            type: "merchants",
                            merchants: office.merchants,
                        }),
                        dispatch({
                            type: "officeId",
                            officeId: office.id,
                        }),
                        dispatch({
                            type: "officeName",
                            officeName: office.name,
                        }),
                        dispatch({
                            type: "numberOfStorey",
                            numberOfStorey: office.floor,
                        }),
                        router.push(`/office/${office.id}`)
                    )}
                />
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(
    geolocated({
        positionOptions: {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
        },
        userDecisionTimeout: 5000,
    })(Map)
);
