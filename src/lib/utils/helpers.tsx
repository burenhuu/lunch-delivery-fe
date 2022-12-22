import { toast as reactToastify } from "react-toastify";
import { intervalToDuration } from "date-fns";
import { zeroPad } from "react-countdown";

// export const toast = (text: string, location: boolean = false) =>
//     reactToastify(text, {
//         position: location ? "top-left" : "bottom-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         theme: "dark",
//         bodyClassName: "text-center text-sm",
//         className: "custom-toast",
//     });

export const renderStars = (avgReview: number, type: string = "") => {
    const stars: any[] = [];

    for (let i = 0; i < 5; i++) {
        let star;

        if (i < Math.floor(avgReview)) {
            star = (
                <span
                    key={i}
                    className={`${
                        type == "review" && "text-lg"
                    } icon-Star---Yellow-icon`}
                    style={
                        type == "coffeeShop"
                            ? { fontSize: "8px", marginLeft: "1.5px" }
                            : type == "review"
                            ? {}
                            : { fontSize: "11px", marginLeft: "1.5px" }
                    }
                ></span>
            );
        } else if (
            i < Math.ceil(avgReview) &&
            avgReview !== Math.round(avgReview)
        ) {
            star = (
                <span
                    key={i}
                    className={`${
                        type == "review" && "text-lg"
                    } icon-half-star`}
                    style={
                        type == "coffeeShop"
                            ? { fontSize: "8px", marginLeft: "1.5px" }
                            : type == "review"
                            ? {}
                            : { fontSize: "11px", marginLeft: "1.5px" }
                    }
                >
                    <span className="path1"></span>
                    <span className="path2"></span>
                </span>
            );
        } else {
            star = (
                <span
                    key={i}
                    className={`${
                        type == "review" && "text-lg"
                    } icon-Star---Gray-icon`}
                    style={
                        type == "coffeeShop"
                            ? { fontSize: "8px", marginLeft: "1.5px" }
                            : type == "review"
                            ? {}
                            : { fontSize: "11px", marginLeft: "1.5px" }
                    }
                ></span>
            );
        }

        stars.push(star);
    }

    return stars;
};

export function formatPrice(number: any) {
    const fnumber = parseFloat(number);
    return new Intl.NumberFormat("en-US", {
        // style: "currency",
        // currency: "USD",
    })
        .format(fnumber)
        .replace(/,/g, "'");
}

export function calcTimeDiff(
    start: string,
    end: string,
    seconds: boolean = true
) {
    const duration: any = intervalToDuration({
        start: start ? new Date(start.replace(/ /g, "T")) : new Date(),
        end: new Date(end.replace(/ /g, "T")),
    });

    return `${
        duration.years && duration.years > 0 ? duration.years + " жил " : ""
    } ${
        duration.months && duration.months > 0 ? duration.months + " сар " : ""
    } ${duration.days && duration.days > 0 ? duration.days + " өдөр " : ""} ${
        duration.hours && duration.hours > 0 ? duration.hours + "цаг " : ""
    }${duration && duration.minutes}${
        seconds && duration.seconds && duration.seconds > 0
            ? `:${duration.seconds}`
            : ""
    }`;
}
