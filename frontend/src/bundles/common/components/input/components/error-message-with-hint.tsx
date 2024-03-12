type Properties = {
    errorMessage: string;
};

const ErrorMessageWithHint = ({ errorMessage }: Properties): JSX.Element => {
    return (
        <div className="group relative">
            <span className="text-lm-red bg-primary inline-block w-full cursor-pointer overflow-hidden truncate whitespace-nowrap px-3 text-sm">
                {errorMessage}
            </span>
            <div className="bg-primary text-lm-red -left-1/6 translate-x-1/6 absolute top-0 z-20 hidden transform px-3 text-sm group-hover:block">
                {errorMessage}
            </div>
        </div>
    );
};

export { ErrorMessageWithHint };
