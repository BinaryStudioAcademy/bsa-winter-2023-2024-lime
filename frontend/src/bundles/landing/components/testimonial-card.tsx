import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    rating: 1 | 2 | 3 | 4 | 5;
    text: string;
    name: string;
    occupation: string;
    avatarImage: string;
    avatarBgColor?: string;
};

const TestimonialCard = ({
    rating,
    text,
    name,
    occupation,
    avatarImage,
    avatarBgColor,
}: Properties): JSX.Element => {
    const ratingToEmoji: Record<1 | 2 | 3 | 4 | 5, string> = {
        1: '\u2B50',
        2: '\u2B50\u2B50',
        3: '\u2B50\u2B50\u2B50',
        4: '\u2B50\u2B50\u2B50\u2B50',
        5: '\u2B50\u2B50\u2B50\u2B50\u2B50',
    };

    return (
        <div className="bg-secondary flex max-w-[31.5rem] shrink-0 flex-col justify-between gap-3 rounded-[1rem] p-[1rem] leading-4">
            {ratingToEmoji[rating]}
            <p className="font-bold">{text}</p>
            <div className="text-secondary flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <div
                        className={getValidClassNames(
                            'mr-[1rem] flex size-[2.5rem] items-center rounded-full',
                            avatarBgColor ?? 'bg-lm-yellow-100',
                        )}
                        style={{ backgroundColor: avatarBgColor }}
                    >
                        <img
                            src={avatarImage}
                            alt="Avatar"
                            className="rounded-full"
                        />
                    </div>
                    <p className="text-sm font-extrabold">{name}</p>
                </div>
                <p className="text-sm">{occupation}</p>
            </div>
        </div>
    );
};

export { TestimonialCard };
