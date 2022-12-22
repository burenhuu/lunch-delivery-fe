import bg from "date-fns/esm/locale/bg/index.js";

export default function ButtonComponent({ text }: { text: string }) {
    return (
        <div className="bg-gradient-to-r from-gradient-start  to-gradient-end text-white text-center rounded-md shadow-delivery px-5 text-base py-2.5">
            {text}
        </div>
    );
}
