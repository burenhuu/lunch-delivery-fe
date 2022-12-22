import { useState } from "react";

import { useAppState } from "lib/context/app";
import { Category } from "lib/types/merchant-menu-category.type";
import CountBadge from "components/common/count-badge";

interface CategoryProps {
    categories: Category[];
    defaultCategoryId: string;
    setCategoryTabId(categoryId: string): void;
}

const Category: React.FC<CategoryProps> = ({
    categories,
    defaultCategoryId,
    setCategoryTabId,
}) => {
    const [categoryId, setCategoryId] = useState(defaultCategoryId);
    const [state, dispatch]: any = useAppState();
    const [lastCategory, setLastCategory] = useState(false);
    return (
        <>
            <div
                className="m-0 mt-[-8px] pt-[8px] mb-5 absolute w-[calc(-40px+100vw)] scrollbar-hide overflow-auto  "
                style={{
                    boxShadow: "3px 3px 10px 0 rgba(30, 35, 53, 0.04)",
                    backgroundClip: "content-box",
                    // direction: lastCategory ? "rtl" : "ltr",
                }}
            >
                <ul
                    className="relative z-30 flex text-sm  w-full font-medium text-center nav nav-tabs rounded-[10px]  "
                    id="tabs-tab"
                    role="tablist"
                >
                    {categories &&
                        categories.map((category: Category, index: number) => (
                            <li
                                key={index}
                                className={`relative w-full h-[40px]`}
                                onClick={() => {
                                    setCategoryId(category._id);
                                    setCategoryTabId(category._id);
                                    dispatch({
                                        type: "categoryId",
                                        categoryId: category._id,
                                    });
                                    index == categories.length - 1
                                        ? setLastCategory(true)
                                        : setLastCategory(false);
                                }}
                            >
                                <button
                                    className={` inline-block w-full text-base px-[20px]  h-[40px] truncate  p-2 ${
                                        categoryId === category._id
                                            ? `text-white rounded-[10px] font-medium active`
                                            : `bg-white text-[#647382] font-normal rounded-[10px]`
                                    }`}
                                    style={{
                                        backgroundColor:
                                            categoryId === category._id
                                                ? state.themeColor
                                                : "#ffffff",
                                    }}
                                >
                                    {category.name}
                                </button>
                                {category.cart_items_count > 0 && (
                                    <CountBadge
                                        state={state}
                                        count={category.cart_items_count}
                                        isCategory={true}
                                    />
                                )}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="  absolute w-[calc(-40px+100vw)] bg-white rounded-[15px] h-[40px]"></div>
        </>
    );
};

export default Category;
