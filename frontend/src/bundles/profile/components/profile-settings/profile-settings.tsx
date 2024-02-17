import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    RadioCard,
} from '~/bundles/common/components/components.js';
import { Gender } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userUpdateProfileValidationSchema } from '~/bundles/users/users.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserUpdateProfileRequestDto) => void;
};

const ProfileSettings: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
        });
    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );
    return (
        <div className="bg-lm-black-100 w-[874px] px-12 pl-[52px] pr-[78px] pt-[48px]">
            <div className="flex items-center pb-[47px]">
                <div className="bg-lm-yellow-100/90 relative flex h-20 w-20 items-center justify-center rounded-full">
                    <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="avatar"
                        className="border-3 h-full w-full rounded-full border-gray-500 object-cover"
                    />
                </div>

                <Button
                    className="w-120 ml-[13px] h-[38px] rounded-[20px]"
                    type="submit"
                    label="Update file"
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.MEDIUM}
                />
            </div>
            <form
                className=" w-100 h-100 grid-cols-gap-28 grid grid-cols-4 grid-rows-2 gap-x-6"
                onSubmit={handleFormSubmit}
            >
                <Input
                    classname="col-start-1 col-end-3"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    name="fullname"
                    control={control}
                    errors={errors}
                />

                <Input
                    classname="col-start-3 col-end-5"
                    type="text"
                    label="Nickname"
                    placeholder="MyNickname2024"
                    name="nickname"
                    control={control}
                    errors={errors}
                />
                <Input
                    classname="col-start-1 col-end-3"
                    type="text"
                    label="Date of birth"
                    placeholder="DD/MM/YYYY"
                    name="birthdate"
                    control={control}
                    errors={errors}
                />
                <Input
                    classname="col-start-3 col-end-4"
                    type="text"
                    label="Weight"
                    placeholder="0 kg"
                    name="weight"
                    control={control}
                    errors={errors}
                />
                <Input
                    classname="col-start-4 col-end-5"
                    type="text"
                    label="Height"
                    placeholder="0 sm"
                    name="height"
                    control={control}
                    errors={errors}
                />
                <RadioCard
                    id="1"
                    name="gender"
                    label="Male"
                    value={Gender.MALE}
                    control={control}
                />
                <RadioCard
                    id="1"
                    name="gender"
                    label="Female"
                    value={Gender.FEMALE}
                    control={control}
                />
                <RadioCard
                    id="1"
                    name="gender"
                    label="Prefer not to say"
                    value={Gender.OTHER}
                    control={control}
                />
                <Button
                    type="submit"
                    label="Save"
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                />
            </form>
        </div>
    );
};

export { ProfileSettings };
