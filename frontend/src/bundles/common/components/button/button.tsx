type Properties = {
    label: string;
    type?: 'button' | 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
    <button type={type}>{label}</button>
);

export { Button };
