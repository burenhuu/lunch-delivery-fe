import FoodBorder from "components/common/food-border";
import { Category } from "lib/types/merchant-menu-category.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryCard({
    category,
    small = false,
    active = false,
}: {
    category: Category;
    small?: boolean;
    active?: boolean;
}) {
    const { id, name, icon } = category;
    const router = useRouter();
    const onCategoryCardClick = async () => {
        if (!small) {
            router.push(`/category/${id}`);
        }
    };

    return (
        // <Link href={`/office/${router.query.officeId}/category/${title}`}>
        <div
            onClick={onCategoryCardClick}
            className="flex flex-col items-center gap-y-1.25"
        >
            <div
                className={
                    "relative overflow-hidden " +
                    (small ? "w-[55px] h-[55px]" : "w-[72.5px] h-[72.5px]")
                }
            >
                <Image
                    src={`/images/${icon}`}
                    alt={icon}
                    width={small ? 55 : 72.5}
                    height={small ? 55 : 72.5}
                    className="rounded-md object-cover "
                />
                {small && active && <FoodBorder />}
            </div>
            <div
                className={
                    "text-xs " + (small && active ? "text-main" : "text-gray")
                }
            >
                {name}
            </div>
        </div>
        // </Link>
    );
}
