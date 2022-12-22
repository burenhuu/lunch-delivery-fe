import { useState, useEffect } from "react";

import Office from "lib/types/office.type";
import SearchInput from "./search-input";

interface SearchShopProps {
    onSearchSubmit(searchValue: string): void;
    clearResults(): void;
    offices: Office[];
    loading: boolean;
    bySearchBar: boolean;
    setBySearchbar(bySearchbar: boolean): void;
}

const SearchShop: React.FC<SearchShopProps> = ({
    onSearchSubmit,
    clearResults,
    offices,
    loading,
    bySearchBar,
    setBySearchbar,
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
            setBySearchbar(false);
        }
    }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!bySearchBar) {
            setSearchValue("");
            setDebouncedSearchValue("");
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
        />
    );
};

export default SearchShop;
