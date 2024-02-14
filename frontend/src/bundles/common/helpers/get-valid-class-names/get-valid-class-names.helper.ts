import { clsx } from 'clsx';
import { type ClassValue } from 'clsx';

const getValidClassNames = (...classes: ClassValue[]): string => {
    return clsx(...classes);
};

export { getValidClassNames };
