type CircularProgressProperties = {
    value: number;
    target: number;
};

const CircularProgress = ({
    value,
    target,
}: CircularProgressProperties): JSX.Element => {
    const radius = 72;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / target) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                className="stroke-lm-black-100 fill-transparent rounded-34"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                className="stroke-lm-yellow-100 fill-transparent rounded-sm transition-all duration-1000 ease-in-out"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

export { CircularProgress };
