export default function ButtonComponent({
    text,
    loading = false,
    additionalClass,
    onClick,
}: any) {
    return (
        <button
            className={`bg-gradient-to-r ${
                loading
                    ? ""
                    : "bg-gradient-to-r from-gradient-start  to-gradient-end "
            } text-white text-center rounded-[10px] shadow-delivery px-5 text-base py-2.5 h-[40px] w-full ${additionalClass}`}
            style={{
                backgroundColor: loading && "#B3BFC6",
            }}
            type="submit"
            disabled={loading}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
