import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    size: ValueOf<typeof AvatarSize>;
};

const AvatarSize = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
} as const;

const sizeToClass: Record<ValueOf<typeof AvatarSize>, string> = {
    [AvatarSize.SMALL]: 'h-12 w-12',
    [AvatarSize.MEDIUM]: 'h-20 w-20',
    [AvatarSize.LARGE]: 'h-30 w-30',
};

const getTextSize = (size: ValueOf<typeof AvatarSize>): string => {
    switch (size) {
        case AvatarSize.SMALL: {
            return 'text-xl';
        }
        case AvatarSize.MEDIUM: {
            return 'text-3xl';
        }
        case AvatarSize.LARGE: {
            return 'text-4xl';
        }
        default: {
            return 'text-base';
        }
    }
};

const Avatar = ({ size }: Properties): JSX.Element => {
    const { email, avatarUrl } = useAppSelector((state) => state.auth.user);
    const firstLetter = email.charAt(0).toUpperCase();

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
                    className={`object-cover font-bold text-white ${getTextSize(size)}`}
                >
                    {firstLetter}
                </span>
            )}
        </div>
    );
};

export { Avatar };
