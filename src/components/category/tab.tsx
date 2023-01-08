import { CategoryType } from "lib/types/category.type";

export default function CategoryTab({
    activeTab,
    setActiveTab,
    tabs,
    merchant = false,
    setOnFirstLoad
}: {
    activeTab: string;
    setActiveTab: any;
    tabs: any[];
    merchant?: boolean;
    setOnFirstLoad: any
}) {
    return (
        <div
            className={
                "flex overflow-x-auto w-full scrollbar-hide gap-x-5 items-stretch " +
                (merchant ? "px-5" : "px-[30px]")
            }
        >
            {!merchant && (
                <div
                    onClick={() => setActiveTab("Бүгд")}
                    className="flex flex-col gap-y-2 whitespace-nowrap"
                >
                    <div
                        className={
                            "Бүгд" === activeTab
                                ? "text-main font-medium"
                                : "text-gray"
                        }
                    >
                        Бүгд
                    </div>
                    {"Бүгд" === activeTab && (
                        <div className="h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end rounded-sm"></div>
                    )}
                </div>
            )}
            {tabs?.map((category: CategoryType) => {
                const { name, id } = category;
                return (
                    <div
                        onClick={() => {
                            setActiveTab(id)
                            setOnFirstLoad(false)
                        }}
                        key={id}
                        className="flex flex-col gap-y-2 whitespace-nowrap"
                    >
                        <div
                            className={
                                id === activeTab
                                    ? "text-main font-medium"
                                    : "text-gray"
                            }
                        >
                            {name}
                        </div>
                        {id === activeTab && (
                            <div className="h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end rounded-sm"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
