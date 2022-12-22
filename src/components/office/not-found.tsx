const OfficeNotFound = () => {
    return (
        <div className="flex flex-col items-center w-full h-full mx-auto ">
            <p className="mb-3 text-sm text-center">
                Таны хайсан байршилд хоол захиалах үйлчилгээ хараахан нэвтрээгүй
                байна
            </p>
            <img
                src="images/not-found.png"
                alt="Хайлт олдсонгүй."
                className="h-full max-h-[160px] my-auto w-full object-contain max-w-[278px] mx-auto"
            />
        </div>
    );
};

export default OfficeNotFound;
