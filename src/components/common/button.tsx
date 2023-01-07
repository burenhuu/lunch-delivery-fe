export default function ButtonComponent({ text, loading = false }: any) {
    return (
        <button
            className={`bg-gradient-to-r ${
                loading
                    ? ""
                    : "bg-gradient-to-r from-gradient-start  to-gradient-end "
            } text-white text-center rounded-md shadow-delivery px-5 text-base py-2.5`}
            style={{
                backgroundColor: loading && "#B3BFC6",
            }}
            type="submit"
            disabled={loading}
        >
            {text}
        </button>
    );
}
