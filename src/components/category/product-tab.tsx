export default function ProductTab({
    activeTab,
    setActiveTab,
    productFilters,
}: {
    activeTab: any;
    setActiveTab: any;
    productFilters: any;
}) {
    return (
        <div className="flex items-center justify-between px-5 gap-x-1.25 ">
            {productFilters?.map((filter: any) => {
                return (
                    <>
                        {activeTab.sort === filter.sort ? (
                            <div
                                key={filter.sort}
                                className={
                                    "bg-white relative w-full  text-center bg-clip-padding text-sm rounded-md z-10 shadow-delivery p-2.5 text-main gradient-border"
                                }
                            >
                                {filter.name}
                            </div>
                        ) : (
                            <div
                                key={filter.sort}
                                onClick={() => setActiveTab(filter)}
                                className={
                                    "bg-white w-full text-center bg-clip-padding text-sm rounded-md z-10 shadow-delivery p-2.5 text-gray"
                                }
                            >
                                {filter.name}
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
}
