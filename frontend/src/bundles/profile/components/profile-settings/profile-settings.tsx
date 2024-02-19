import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    Loader,
    RadioCard,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { Gender } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userUpdateProfileValidationSchema } from '~/bundles/users/users.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserUpdateProfileRequestDto) => void;
    isLoading: boolean;
};

const ProfileSettings: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, isDirty, isValid, handleSubmit, reset } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
            mode: 'onBlur',
            shouldUnregister: false,
        });
    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const handleCancel = useCallback((): void => {
        void reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
    }, [reset]);

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
                    className="col-start-1 col-end-3"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    name="fullname"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <Input
                    className="col-start-3 col-end-5"
                    type="text"
                    label="Nickname"
                    placeholder="MyNickname2024"
                    name="nickname"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <Input
                    className="col-start-1 col-end-3"
                    type="text"
                    label="Date of birth"
                    placeholder="DD/MM/YYYY"
                    name="birthdate"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <Input
                    className="col-start-3 col-end-4"
                    type="text"
                    label="Weight"
                    placeholder="0 kg"
                    name="weight"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <Input
                    className="col-start-4 col-end-5"
                    type="text"
                    label="Height"
                    placeholder="0 sm"
                    name="height"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
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
                <ul className="col-start-3 col-end-5 row-start-4 mt-6 flex">
                    <li className="mr-6 w-full">
                        <Button
                            label={isLoading ? '' : 'Cancel'}
                            leftIcon={
                                isLoading && (
                                    <Loader color={IconColor.SECONDARY} />
                                )
                            }
                            onClick={handleCancel}
                            isDisabled={!isDirty || isLoading}
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                        />
                    </li>
                    <li className="w-full">
                        <Button
                            label={isLoading ? '' : 'Save'}
                            leftIcon={
                                isLoading && (
                                    <Loader color={IconColor.SECONDARY} />
                                )
                            }
                            type="submit"
                            isDisabled={!isDirty || !isValid}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
};

export { ProfileSettings };
