import { Office } from "lib/types/office.type";
import { useState, useEffect } from "react";
import SearchInput from "./search-input";

interface SearchShopProps {
    onSearchSubmit(searchValue: string): void;
    clearResults(): void;
    offices: Office[];
    loading: boolean;
    bySearchBar: boolean;
    setBySearchbar(bySearchbar: boolean): void;
    setNoResults: any
}

const SearchShop: React.FC<SearchShopProps> = ({
    onSearchSubmit,
    clearResults,
    offices,
    loading,
    bySearchBar,
    setBySearchbar,
    setNoResults
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] =
        useState(searchValue);

    // update 'searchValue' value after 1 second from the last update of 'debouncedSearchValue'
    useEffect(() => {
        const timer = setTimeout(
            () => setSearchValue(debouncedSearchValue),
            600
        );
        return () => clearTimeout(timer);
    }, [debouncedSearchValue]);

    // submit a new searchValue
    useEffect(() => {
        if (searchValue !== "") {
            onSearchSubmit(searchValue);
            setBySearchbar(true);
        } else {
            clearResults();
            setNoResults(true);
        }
    }, [searchValue]);

    useEffect(() => {
        if (!bySearchBar) {
            setSearchValue("");
            setDebouncedSearchValue("");
        } else {
            setNoResults(true)
        }
    }, [bySearchBar]);

    return (
        <SearchInput
            debouncedSearchValue={debouncedSearchValue}
            setDebouncedSearchValue={setDebouncedSearchValue}
            loading={loading}
            bySearchBar={bySearchBar}
            searchValue={searchValue}
            offices={offices}
            setBySearchbar={setBySearchbar}
        />
    );
};

export default SearchShop;
