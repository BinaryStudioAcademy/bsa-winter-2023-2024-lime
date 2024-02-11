import { components } from 'react-select';

//Expected to change svg by component
const DropdownIndicator: typeof components.DropdownIndicator = (properties) => {
    return (
        <components.DropdownIndicator {...properties}>
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29295 5.70698L0.853647 1.26769C0.538648 0.95269 0.761747 0.414091 1.20715 0.414091L10.7929 0.414091C11.2384 0.414091 11.4615 0.95269 11.1465 1.26769L6.70715 5.70698C6.31665 6.09751 5.68345 6.09751 5.29295 5.70698Z" fill="#383F4A" />
            </svg>
        </components.DropdownIndicator>
    );
};

export { DropdownIndicator };