export default function FooterCartButton({ count }: any) {
    return (
        <div
            className={`absolute -top-2 -right-4 rounded-full bg-gradient-end px-1.25 pt-0.5 pb-[1px] text-white text-smaller text-center z-20`}
        >
            {count}
        </div>
    );
}
