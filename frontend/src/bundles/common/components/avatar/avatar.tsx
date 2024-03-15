import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type AvatarSize = ValueOf<typeof ComponentSize>;

type Properties = {
    size: AvatarSize;
    email: string;
    avatarUrl: string | null;
};

const sizeToClass: Record<AvatarSize, string> = {
    [ComponentSize.SMALL]: 'h-10 w-10',
    [ComponentSize.MEDIUM]: 'h-20 w-20',
    [ComponentSize.LARGE]: 'h-30 w-30',
    [ComponentSize.EXTRA_LARGE]: 'h-44 w-44'
};

const sizeMap: Record<AvatarSize, string> = {
    [ComponentSize.SMALL]: 'text-xl',
    [ComponentSize.MEDIUM]: 'text-3xl',
    [ComponentSize.LARGE]: 'text-4xl',
    [ComponentSize.EXTRA_LARGE]: 'text-4xl'
};

const Avatar = ({ size, email, avatarUrl }: Properties): JSX.Element => {
    const firstLetter = email ? email.charAt(0).toUpperCase() : '';

    return (
        <div
            className={`bg-lm-yellow-100/90 relative flex items-center justify-center rounded-full ${sizeToClass[size]}`}
        >
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className={
                        'border-3 h-full w-full rounded-full border-gray-500 object-cover'
                    }
                />
            ) : (
                <span
                    className={`text-primary object-cover font-bold ${sizeMap[size]}`}
                >
                    {firstLetter}
                </span>
            )}
        </div>
    );
};

export { Avatar };
