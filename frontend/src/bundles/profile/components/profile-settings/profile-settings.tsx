import {
    Avatar,
    Button,
    ButtonVariant,
    Input,
    Loader,
    Radio,
} from '~/bundles/common/components/components.js';
import { DatePicker } from '~/bundles/common/components/date-picker/date-picker.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize, Gender } from '~/bundles/common/enums/enums.js';
import { RadioType } from '~/bundles/common/enums/radio-type.enum.js';
import {
    useAppForm,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserUpdateProfileRequestDto,
    userUpdateProfileValidationSchema,
} from '~/bundles/users/users.js';

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
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));
    const { control, errors, reset, getValues } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
            mode: 'onTouched',
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
        <div className="bg-lm-black-200 pl-13 pr-18 w-[874px] px-12 pb-9 pt-3">
            <div className="flex items-center pb-12">
                <Avatar
                    size="lg"
                    email={user ? user?.email : ''}
                    avatarUrl={user ? user.avatarUrl : ''}
                />

                <input
                    id="avatarInput"
                    type="file"
                    accept="image/jpeg, image/png"
                    className="hidden"
                />
                <Button
                    className="w-115 ml-3 h-[38px] rounded-[20px]"
                    type="submit"
                    label="Update file"
                    variant={ButtonVariant.SECONDARY}
                    size={ComponentSize.SMALL}
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
                    <Radio
                        id="radio-male"
                        name="gender"
                        label="Male"
                        value={Gender.MALE}
                        control={control}
                        type={RadioType.CARD}
                        className="rounded-bl-5 w-83 rounded-l-lg "
                    />
                    <Radio
                        id="radio-female"
                        name="gender"
                        label="Female"
                        value={Gender.FEMALE}
                        control={control}
                        type={RadioType.CARD}
                        className="w-83"
                    />
                    <Radio
                        id="radio-other"
                        name="gender"
                        label="Prefer not to say"
                        value={Gender.OTHER}
                        control={control}
                        type={RadioType.CARD}
                        className="w-50 rounded-r-lg"
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
                            variant={ButtonVariant.SECONDARY}
                            size={ComponentSize.MEDIUM}
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
                            variant={ButtonVariant.PRIMARY}
                            size={ComponentSize.MEDIUM}
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
};

export { ProfileSettings };
