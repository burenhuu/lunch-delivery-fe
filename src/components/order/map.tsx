import { GoogleMap } from "@react-google-maps/api";
import { useState } from "react";

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

export default function OrderMap() {
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 47.917183173166144,
        lng: 106.91973505828838,
    });
    return (
        <GoogleMap
            mapContainerClassName="w-full h-full z-0 rounded-2.5xl"
            center={center}
        ></GoogleMap>
    );
}
