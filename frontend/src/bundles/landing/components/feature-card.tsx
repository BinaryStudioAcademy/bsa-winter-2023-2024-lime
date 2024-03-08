import { Icon } from '~/bundles/common/components/components.js';
import {
    type IconName,
    IconColor,
} from '~/bundles/common/components/icon/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    iconName: ValueOf<typeof IconName>;
    title: string;
    description: string;
};

const FeatureCard = ({
    iconName,
    title,
    description,
}: Properties): JSX.Element => {
    return (
        <div className="bg-secondary rounded-[1rem] px-[2rem] py-[1.5rem] leading-4">
            <div className="flex items-center">
                <span className="inline-block">
                    <Icon
                        name={iconName}
                        color={IconColor.PRIMARY}
                        className="fill-lm-yellow-100 size-4"
                    />
                </span>
                <h4 className="ml-2 inline-block text-base font-bold">
                    {title}
                </h4>
            </div>
            <p className="text-lm-grey-100 mt-2 text-sm font-normal">
                {description}
            </p>
        </div>
    );
};

export { FeatureCard };
