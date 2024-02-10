import { clsx } from 'clsx';

const getValidClassNames = (...classes: string[]): string => {
    return clsx(...classes);
};

export { getValidClassNames };
