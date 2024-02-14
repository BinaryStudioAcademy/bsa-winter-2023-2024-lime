import { CheckIcon } from '@heroicons/react/16/solid';

type CheckProperties = {
    className?: string;
};

const CheckIconComponent = ({ className }: CheckProperties): JSX.Element => {
    return <CheckIcon className={className} />;
};

export { CheckIconComponent };
