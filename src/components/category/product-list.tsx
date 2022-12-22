import { Product } from "lib/types/merchant-product.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { dummyProducts } from "lib/types/dummy-data";
import { useEffect, useState } from "react";
import CategoryCard from "components/product-category/card";

export default function CategoryProduct({ products }: { products?: Product }) {
    const swiperLength = Math.ceil(dummyProducts.length / 10);
    const [activeProduct, setActiveProduct] = useState<string>(
        dummyProducts[0].title
    );
    const onProductClick = (title: string) => {
        setActiveProduct(title);
    };
    return (
        <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            className="w-full my-col-15"
            autoplay={false}
        >
            {[...Array(swiperLength)]?.map((n: any, index: number) => {
                return (
                    <SwiperSlide className="grid grid-cols-5 gap-y-2.5 px-5 gap-x-3.75">
                        {dummyProducts
                            ?.slice(index * 10, (index + 1) * 10)
                            .map((product) => {
                                return (
                                    <div
                                        onClick={() =>
                                            onProductClick(product.title)
                                        }
                                    >
                                        <CategoryCard
                                            category={product}
                                            key={product.title}
                                            small={true}
                                            active={
                                                product.title === activeProduct
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
