import { Category } from "lib/types/merchant-menu-category.type";

export default function CategoryTab({
    activeTab,
    setActiveTab,
    tabs,
    merchant = false,
}: {
    activeTab: string;
    setActiveTab: any;
    tabs: any[];
    merchant?: boolean;
}) {
    return (
        <div
            className={
                "flex overflow-x-scroll w-full scrollbar-hide gap-x-5 items-stretch " +
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
            {tabs?.map((category: Category) => {
                const { name, id } = category;
                return (
                    <div
                        onClick={() => setActiveTab(id)}
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
