import CenteredSpin from "components/common/centered-spin";
import Overlay from "components/common/overlay";
import Spin from "components/common/spin";
import { useAppState } from "lib/context/app";
import Office from "lib/types/office.type";
import OptionCard from "./option-card";

export default function SearchInput({
    type,
    debouncedSearchValue,
    setDebouncedSearchValue,
    loading,
    bySearchBar,
    searchValue,
    offices,
}: any) {
    const [state]: any = useAppState();

    return (
        <div
            className={`${
                type === 1 ? "mb-3" : "absolute mt-5"
            } z-30 flex flex-col justify-center w-full mx-auto`}
        >
            <div
                className={` ${
                    type === 1 ? "" : "mx-5"
                } relative  text-[#647382] font-normal focus-within:text-gray-400`}
            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="p-1  focus:shadow-outline py-auto">
                        <span className="icon-Search---Light-icon-2 text-[17px]"></span>
                    </span>
                </span>
                <input
                    onKeyDown={(e: any) => {
                        if (e.keyCode === 13) {
                            e.target.blur();
                        }
                    }}
                    type="input"
                    className={`w-full py-2 pl-10 pr-10  text-sm
                     text-[#647382] font-normal placeholder:font-light bg-white border-none rounded-[10px] disabled  ${
                         type === 1 && "cursor-pointer"
                     }`}
                    placeholder={` ${
                        type === 1 ? state.officeName : "Хаяг хайх"
                    }  `}
                    autoComplete="off"
                    maxLength={50}
                    onChange={(e) => setDebouncedSearchValue(e.target.value)}
                    value={debouncedSearchValue}
                    enterKeyHint="search"
                />
                {loading && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 mr-1">
                        {/* <Spin /> */}
                    </span>
                )}
            </div>

            {bySearchBar && searchValue && offices && offices.length > 0 && (
                <div className="relative grid grid-cols-1  mx-5 mt-3 text-sm text-gray-600 bg-white divide-y-[0.5px] rounded-[10px] max-h-[50vw] overflow-auto scrollbar-hide px-[15px] divide-[#B3BFC6]">
                    {loading && (
                        <>
                            {/* <Overlay isOfficeList={false} />
                            <CenteredSpin size={8} /> */}
                        </>
                    )}
                    {offices.map((office: Office, index: number) => (
                        <OptionCard key={index} office={office} />
                    ))}
                </div>
            )}
        </div>
    );
}
