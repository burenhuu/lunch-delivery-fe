import FoodBorder from "components/common/food-border";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryCard({
    category,
    small = false,
    active = false,
}: {
    category: { title: string; img: string };
    small?: boolean;
    active?: boolean;
}) {
    const { title, img } = category;
    const router = useRouter();
    const onCategoryCardClick = async () => {
        if (!small) {
            router.push(`/category/${title}`);
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
                    src={`/images/${img}`}
                    alt={img}
                    width={small ? 55 : 72.5}
                    height={small ? 55 : 72.5}
                    className="rounded-md object-cover "
                />
                {small && active && <FoodBorder />}
            </div>
            <div
                className={
                    "text-center text-xs " +
                    (small && active ? "text-main" : "text-gray")
                }
            >
                {title}
            </div>
        </div>
        // </Link>
    );
}
