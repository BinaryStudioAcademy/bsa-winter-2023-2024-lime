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
    [AvatarSize.SMALL]: 'h-10 w-10',
    [AvatarSize.MEDIUM]: 'h-20 w-20',
    [AvatarSize.LARGE]: 'h-30 w-30',
};

const sizeMap: Record<ValueOf<typeof AvatarSize>, string> = {
    [AvatarSize.SMALL]: 'text-xl',
    [AvatarSize.MEDIUM]: 'text-3xl',
    [AvatarSize.LARGE]: 'text-4xl',
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
                    className={`object-cover font-bold text-white ${sizeMap[size]}`}
                >
                    {firstLetter}
                </span>
            )}
        </div>
    );
};

export { Avatar };
