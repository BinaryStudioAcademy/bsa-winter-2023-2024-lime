import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type AvatarSize = Exclude<
    ValueOf<typeof ComponentSize>,
    typeof ComponentSize.EXTRA_LARGE
>;

type Properties = {
    size: AvatarSize;
};

const sizeToClass: Record<AvatarSize, string> = {
    [ComponentSize.SMALL]: 'h-10 w-10',
    [ComponentSize.MEDIUM]: 'h-20 w-20',
    [ComponentSize.LARGE]: 'h-30 w-30',
};

const sizeMap: Record<AvatarSize, string> = {
    [ComponentSize.SMALL]: 'text-xl',
    [ComponentSize.MEDIUM]: 'text-3xl',
    [ComponentSize.LARGE]: 'text-4xl',
};

const Avatar = ({ size }: Properties): JSX.Element => {
    const { email, avatarUrl } = useAppSelector(
        (state) => state.auth.user || { email: '', avatarUrl: '' },
    );

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
