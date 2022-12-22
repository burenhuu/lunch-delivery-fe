import CenteredSpin from "components/common/centered-spin";
import OfficeCard from "./card";
import Office from "lib/types/office.type";

interface OfficeListProps {
    title: string;
    offices: Office[];
    loading: boolean;
    height: string;
    setHeight: any;
    setMaxHeight: any;
}

const OfficeList: React.FC<OfficeListProps> = ({
    title,
    offices,
    loading,
    height,
    setHeight,
    setMaxHeight,
}) => {
    const heightHandler = async () => {
        height == "340px"
            ? (setHeight("100%"), setMaxHeight("90vh"))
            : (setHeight("340px"), setMaxHeight("40vh"));
    };

    return (
        <div>
            <div className="absolute bg-white w-[100px] mx-auto h-[5px] rounded-[2.5px] -top-3 left-1/2 -translate-x-1/2"></div>
            <div
                onTouchEnd={() => heightHandler()}
                className="text-center font-medium mb-5"
            >
                {title}
            </div>
            <div
                className={`scrollbar-hide h-full pb-6 px-5 mx-[-20px] pt-5 mt-[-20px] ${
                    !loading && height != "340px" && "overflow-auto"
                }`}
            >
                {offices &&
                    offices.map((office: Office, index: number) => (
                        <OfficeCard key={index} office={office} />
                    ))}
            </div>
        </div>
    );
};

export default OfficeList;
