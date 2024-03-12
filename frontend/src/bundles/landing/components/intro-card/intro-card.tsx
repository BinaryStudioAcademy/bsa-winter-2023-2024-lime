import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    number: string;
    title: string;
    description: string;
};

const IntroCard = ({ number, title, description }: Properties): JSX.Element => {
    const styles = {
        default: {
            base: 'w-[18.5rem] opacity-30',
            dot: 'before:border-buttonPrimary before:items-baseline before:absolute before:size-2 before:bg-lm-grey-100 before:rounded-full before:translate-y-1 before:-translate-x-8',
            header: 'relative text-base font-normal leading-4 mb-[0.5rem]',
            description: 'text-lm-grey-100 text-xs font-normal',
        },
        hover: {
            base: 'group-hover:ml-[7rem] group-hover:opacity-100',
            dot: 'group-hover:before:border-buttonPrimary group-hover:before:bg-transparent group-hover:before:items-baseline group-hover:before:absolute group-hover:before:size-[1.375rem] group-hover:before:rounded-full group-hover:before:border-[0.4rem] group-hover:before:translate-y-1 group-hover:before:-translate-x-16',
            header: 'group-hover:text-2xl group-hover:font-bold group-hover:leading-7',
            description:
                'group-hover:text-lm-grey-100 group-hover:font-semibold group-hover:leading-5',
        },
    };

    return (
        <div className="group flex h-[8rem] w-full cursor-pointer items-center justify-center lg:justify-start lg:pl-28">
            <div
                className={getValidClassNames(
                    'delay-50 relative transition-all duration-300 ease-out',
                    styles.default.base,
                    styles.default.dot,
                    styles.hover.base,
                    styles.hover.dot,
                )}
            >
                <h3
                    className={getValidClassNames(
                        styles.default.header,
                        styles.hover.header,
                    )}
                >
                    {number}
                    <br />
                    {title}
                </h3>
                <p
                    className={getValidClassNames(
                        styles.default.description,
                        styles.hover.description,
                    )}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export { IntroCard };
