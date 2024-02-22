type Properties = {
    title: string;
    date: string;
    quantity: string;
};

const AchievementCard: React.FC<Properties> = ({
    title,
    date,
    quantity,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[4.125rem] w-80 justify-between rounded-lg p-4">
            <div>
                <p className="text-lm-grey-200 mb-2 text-sm font-bold  leading-3">
                    {title}
                </p>
                <p className="text-lm-grey-300 text-xs font-normal leading-3">
                    {date}
                </p>
            </div>
            <div className="bg-lm-grey-500 flex items-center justify-center rounded-full px-2 py-1">
                <span className="text-lm-yellow-100 text-xs font-semibold">
                    {quantity}
                </span>
            </div>
        </div>
    );
};

export { AchievementCard };
