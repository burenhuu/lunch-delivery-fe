export function ImageModal({ images }: { images: string[] }) {
    return images?.length > 0 ? (
        <div className="center-modal">
            <div
                id="effect"
                data-aos="fade-up"
                className="flex items-center justify-start px-10 gap-x-2.5 overflow-x-scroll scrollbar-hide"
            >
                {images.map((image) => {
                    return (
                        <img
                            className="rounded-2.5xl mx-auto w-[275px] h-[275px]"
                            src={`/images/${image}`}
                            alt={image}
                        />
                    );
                })}
            </div>
        </div>
    ) : null;
}
