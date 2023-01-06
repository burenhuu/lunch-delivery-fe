export default function ButtonComponent({
    text,
    type = null,
}: {
    text: string;
    type: any;
}) {
    return (
        <button
            className="bg-gradient-to-r from-gradient-start  to-gradient-end text-white text-center rounded-md shadow-delivery px-5 text-base py-2.5"
            type={type}
        >
            {text}
        </button>
    );
}
