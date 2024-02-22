import {
    Avatar,
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    Loader,
    RadioCard,
} from '~/bundles/common/components/components.js';
import { DatePicker } from '~/bundles/common/components/date-picker/date-picker.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { Gender } from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { userUpdateProfileValidationSchema } from '~/bundles/users/users.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserUpdateProfileRequestDto) => void;
    isLoading: boolean;
};

const extractNumbers = (value: string | undefined | null): string => {
    return (value ?? '').trim().replaceAll(/\D/g, '');
};

const ProfileSettings: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const userId = useAppSelector((state) => state.auth.user?.id);

    const { control, errors, isDirty, isValid, reset, getValues } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
            mode: 'onBlur',
            shouldUnregister: false,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();

            const payload: UserUpdateProfileRequestDto = {
                ...getValues(),
                weight: extractNumbers(getValues().weight),
                height: extractNumbers(getValues().height),
                fullName: (getValues().fullName || '').trim(),
                username: (getValues().username || '').trim(),
                id: userId ?? null,
            };

            onSubmit(payload);
            reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
        },
        [onSubmit, getValues, userId, reset],
    );

    const handleCancel = useCallback((): void => {
        void reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
    }, [reset]);

    return (
        <div className="bg-lm-black-200 w-[874px] px-12 pl-[52px] pr-[78px] pt-[48px]">
            <div className="flex items-center pb-[47px]">
                <Avatar size="lg" />

                <input
                    id="avatarInput"
                    type="file"
                    accept="image/jpeg, image/png"
                    className="hidden"
                />
                <Button
                    className="ml-[13px] h-[38px] w-[115px] rounded-[20px]"
                    type="submit"
                    label="Update file"
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                />
            </div>
            <form
                className=" w-100 h-100 grid-cols-gap-28 grid grid-cols-4 grid-rows-2 gap-x-6"
                onSubmit={handleFormSubmit}
            >
                <Input
                    className="col-start-1 col-end-3 border-0"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    name="fullName"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <Input
                    className="col-start-3 col-end-5"
                    type="text"
                    label="Nickname"
                    placeholder="MyNickname2024"
                    name="username"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <DatePicker
                    name="dateOfBirth"
                    control={control}
                    errors={errors}
                    label="Date of birth"
                    placeholder="DD/MM/YYYY"
                    className="col-start-1 col-end-3 "
                />
                <Input
                    className="col-start-3 col-end-4 "
                    type="text"
                    label="Weight"
                    placeholder="0 kg"
                    name="weight"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <Input
                    className="col-start-4 col-end-5 "
                    type="text"
                    label="Height"
                    placeholder="0 sm"
                    name="height"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <div className="col-start-1 col-end-3 flex">
                    <RadioCard
                        id="radio-male"
                        name="gender"
                        label="Male"
                        value={Gender.MALE}
                        control={control}
                        className="rounded-bl-5 w-[83px] rounded-l-lg "
                    />
                    <RadioCard
                        id="radio-female"
                        name="gender"
                        label="Female"
                        value={Gender.FEMALE}
                        control={control}
                        className=" w-[83px] "
                    />
                    <RadioCard
                        id="radio-other"
                        name="gender"
                        label="Prefer not to say"
                        value={Gender.OTHER}
                        control={control}
                        className="w-[200px] rounded-r-lg"
                    />
                </div>
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
