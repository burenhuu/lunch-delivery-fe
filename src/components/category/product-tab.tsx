export default function ProductTab({
    activeTab,
    setActiveTab,
    productFilters
}: {
    activeTab: any;
    setActiveTab: any;
    productFilters: any
}) {
    return (
        <div className="flex items-center justify-between px-5 gap-x-1.25 ">
            {productFilters?.map((filter: any, index: any) => {
                return (
                    <>
                        {
                            activeTab.sort === filter.sort ?
                                <div
                                    key={filter.sort + index}
                                    className={
                                        "bg-white relative w-full text-center bg-clip-padding text-sm rounded-md z-10 shadow-delivery p-2.5 text-main gradient-border"
                                    }
                                >
                                    {filter.name}
                                </div>
                                :
                                <div
                                    key={filter.sort + index}
                                    onClick={() => setActiveTab(filter)}
                                    className={
                                        "bg-white relative w-full  text-center bg-clip-padding text-sm rounded-md z-10 shadow-delivery p-2.5"
                                    }
                                    style={{color: 'rgba(100, 115, 130, 1)'}}
                                >
                                    {filter.name}
                                </div>
                        }

                    </>

                );
            })}
        </div>
    );
}
