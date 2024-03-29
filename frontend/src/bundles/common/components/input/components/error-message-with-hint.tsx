type Properties = {
    errorMessage: string;
};

const ErrorMessageWithHint: React.FC<Properties> = ({
    errorMessage,
}): JSX.Element => {
    return (
        <div className="group relative">
            <span className="bg-secondary text-lm-red inline-block w-full cursor-pointer overflow-hidden truncate whitespace-nowrap px-3 text-sm">
                {errorMessage}
            </span>
            <div className="bg-secondary text-lm-red -left-1/6 translate-x-1/6 absolute top-0 z-20 hidden transform px-3 text-sm group-hover:block">
                {errorMessage}
            </div>
        </div>
    );
};

export { ErrorMessageWithHint };
