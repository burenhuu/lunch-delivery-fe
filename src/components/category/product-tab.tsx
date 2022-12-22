import bg from "date-fns/esm/locale/bg/index.js";
import { productFilters } from "lib/types/dummy-data";

export default function ProductTab({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: any;
}) {
    return (
        <div className="flex items-center justify-between px-5">
            {productFilters?.map((filter) => {
                return (
                    <div
                        key={filter}
                        onClick={() => setActiveTab(filter)}
                        className={
                            "bg-white relative min-w-[60px] text-center bg-clip-padding text-sm rounded-md z-10 shadow-delivery p-2.5 " +
                            (activeTab === filter
                                ? "text-main gradient-border"
                                : "text-gray")
                        }
                    >
                        {filter}
                    </div>
                );
            })}
        </div>
    );
}
