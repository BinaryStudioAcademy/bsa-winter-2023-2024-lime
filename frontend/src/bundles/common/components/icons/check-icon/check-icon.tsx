import { CheckIcon as Icon } from '@heroicons/react/16/solid';

type CheckProperties = {
    className?: string;
};

const CheckIcon = ({ className }: CheckProperties): JSX.Element => {
    return <Icon className={className} />;
};

export { CheckIcon };
