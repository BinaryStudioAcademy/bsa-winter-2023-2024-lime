type Properties = {
    label: string;
    type?: 'button' | 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
    <button
        type={type}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
        {label}
    </button>
);

export { Button };
