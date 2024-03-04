type Properties = {
    title?: string;
    imageSrc?: string;
    name: string;
    data: string;
    chip: string;
};

const Card: React.FC<Properties> = ({ title, imageSrc, name, data, chip }) => {
    return (
        <div className="schedule-card bg-primary w-full rounded-lg p-4 ">
            {title && (
                <div className="text-md text-primary mb-4 font-semibold leading-3">
                    {title}
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center justify-start">
                    {imageSrc && (
                        <div className="mr-2">
                            <img
                                src={imageSrc}
                                width="34"
                                height="34"
                                alt={name}
                            />
                        </div>
                    )}

                    <div>
                        <div
                            className={`text-lm-grey-200 leading-1 mb-2 text-sm ${imageSrc ? 'font-extrabold' : 'font-bold'}`}
                        >
                            {name}
                        </div>
                        <div
                            className={`leading-1 text-xs font-normal ${imageSrc ? 'text-lm-grey-200' : 'text-lm-grey-300'}`}
                        >
                            {data}
                        </div>
                    </div>
                </div>

                <div className="rounded-30 bg-schedule text-action px-2 py-1 text-xs font-semibold leading-3">
                    {chip}
                </div>
            </div>
        </div>
    );
};

export { Card };
