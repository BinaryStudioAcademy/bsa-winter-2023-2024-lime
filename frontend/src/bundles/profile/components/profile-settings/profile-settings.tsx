import ReactRouterPrompt from 'react-router-prompt';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { Checkbox } from '~/bundles/common/components/checkbox/checkbox.js';
import {
    Avatar,
    Button,
    ButtonVariant,
    CopyToClipboard,
    DatePicker,
    Input,
    Loader,
    Modal,
    Radio,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize, Gender } from '~/bundles/common/enums/enums.js';
import {
    configureDateString,
    configureISOString,
    convertHeightToCentimeters,
    convertHeightToMillimeters,
    convertWeightToGrams,
    convertWeightToKilograms,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userBonusesActions } from '~/bundles/user-bonuses/store/user-bonuses.js';
import {
    type UserUpdateProfileRequestDto,
    userUpdateProfileValidationSchema,
} from '~/bundles/users/users.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { constructReferralUrl } from '../../helpers/helpers.js';
import { UserBonusBalance } from '../user-balance/user-bonus-balance.js';
import { Cropper } from './components/components.js';
import {
    DEFAULT_UPDATE_PROFILE_PAYLOAD,
    ERROR_WRONG_FILETYPE_IMG,
} from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserUpdateProfileRequestDto) => void;
    onAvatarUpload: (file: File) => void;
    isLoading: boolean;
};

const ProfileSettings: React.FC<Properties> = ({
    onSubmit,
    onAvatarUpload,
    isLoading,
}) => {
    const fileInputReference = useRef<HTMLInputElement>(null);
    const [imgToCrop, setImgToCrop] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();

    const { user, updateProfile } = useAppSelector(({ auth }) => auth);
    const { userBonusesStatus, userBonusesTransactions } = useAppSelector(
        ({ userBonuses }) => userBonuses,
    );

    const getDefaultValues = useCallback((): UserUpdateProfileRequestDto => {
        const result: {
            [key: string]: string | number | null | undefined | boolean;
        } = {
            ...DEFAULT_UPDATE_PROFILE_PAYLOAD,
        };
        const data: {
            [key: string]: string | number | null | undefined | boolean;
        } = {
            ...user,
        };

        for (const key of Object.keys(DEFAULT_UPDATE_PROFILE_PAYLOAD)) {
            switch (key) {
                case 'dateOfBirth': {
                    if (data['dateOfBirth']) {
                        result[key] = configureDateString(
                            data['dateOfBirth'] as string,
                        );
                    }
                    break;
                }
                case 'weight': {
                    result[key] = convertWeightToKilograms(data[key] as number);
                    break;
                }
                case 'height': {
                    result[key] = convertHeightToCentimeters(
                        data[key] as number,
                    );
                    break;
                }
                default: {
                    if (data[key]) {
                        result[key] = data[key];
                    }
                }
            }
        }
        return result as UserUpdateProfileRequestDto;
    }, [user]);

    const {
        control,
        errors,
        reset,
        setValue,
        handleSubmit,
        getValues,
        isDirty,
    } = useAppForm<UserUpdateProfileRequestDto>({
        defaultValues: getDefaultValues(),
        validationSchema: userUpdateProfileValidationSchema,
        mode: 'onTouched',
        shouldUnregister: false,
    });

    const selectImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setImgToCrop('');

            const image = event.target.files;
            if (image) {
                const file = image[0] as File;
                if (file && file.type.startsWith('image/')) {
                    setImgToCrop(URL.createObjectURL(file));
                    setIsOpen(true);
                } else {
                    notificationManager.error(ERROR_WRONG_FILETYPE_IMG);
                }
                event.target.value = '';
            }
        },
        [],
    );

    useEffect(() => {
        if (updateProfile.avatarUrl) {
            setValue('avatarUrl', updateProfile.avatarUrl, {
                shouldDirty: true,
            });
            dispatch(authActions.clearUpdateProfile());
        }
    }, [updateProfile, setValue, dispatch]);

    const generateFormPayload = useCallback(
        (data: UserUpdateProfileRequestDto) => {
            return {
                ...data,
                avatarUrl: data.avatarUrl || null,
                isPublic: data.isPublic,
                location: data.location ? data.location.trim() : null,
                weight: convertWeightToGrams(data.weight),
                height: convertHeightToMillimeters(data.height),
                dateOfBirth: data.dateOfBirth
                    ? configureISOString(data.dateOfBirth || '')
                    : null,
                fullName: (data.fullName || '').trim(),
                username: data.username ? data.username.trim() : null,
            };
        },
        [],
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit((data) => {
                onSubmit(generateFormPayload(data));
                reset({}, { keepValues: true });
            })(event_);
        },
        [handleSubmit, onSubmit, reset, generateFormPayload],
    );

    const handleSubmitLeaving = useCallback((): Promise<unknown> => {
        return handleSubmit((data) => {
            onSubmit(generateFormPayload(data));
        })();
    }, [handleSubmit, onSubmit, generateFormPayload]);

    const closeModal = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const handleReset = useCallback((): void => {
        void reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
    }, [reset]);

    const handleShowTransactions = useCallback((): void => {
        void dispatch(userBonusesActions.loadAllUserBonusesTransactions());
    }, [dispatch]);

    const handleUploadClick = useCallback((): void => {
        if (fileInputReference.current) {
            fileInputReference.current.click();
        }
    }, [fileInputReference]);

    return (
        <div className="bg-secondary pl-13 pr-18 h-full px-12 pb-9 pt-3 lg:w-[874px]">
            <div className="flex flex-col items-start justify-between gap-5 pb-12 xl:flex-row xl:items-center">
                <div className="flex items-center">
                    <Avatar
                        size="lg"
                        email={user ? user?.email : ''}
                        avatarUrl={getValues().avatarUrl}
                    />
                    <input
                        id="avatarInput"
                        type="file"
                        accept="image/jpeg, image/png"
                        name="update-file"
                        aria-label="Upload avatar"
                        onChange={selectImage}
                        className="hidden"
                        ref={fileInputReference}
                    />
                    <div>
                        <Button
                            className="ml-3 h-[38px] w-[115px] [border-radius:1.25rem]"
                            type="submit"
                            label="Update file"
                            variant={ButtonVariant.SECONDARY}
                            size={ComponentSize.SMALL}
                            onClick={handleUploadClick}
                        />
                    </div>
                    <Modal
                        isOpen={isOpen}
                        title="Crop your avatar"
                        onClose={closeModal}
                    >
                        <Cropper
                            image={imgToCrop}
                            onAvatarUpload={onAvatarUpload}
                            isLoading={isLoading}
                            closeModal={closeModal}
                        />
                    </Modal>
                </div>
                <UserBonusBalance
                    userBonusesTransactions={userBonusesTransactions}
                    userBonusesStatus={userBonusesStatus}
                    className="h-[50%]"
                    bonusBalance={user?.bonusBalance ?? 0}
                    onShowTransactions={handleShowTransactions}
                />
            </div>
            <CopyToClipboard
                label="Copy link with your referral code"
                className="mb-10 w-[60%]"
                textToCopy={
                    user?.referralCode
                        ? constructReferralUrl(user?.referralCode)
                        : ''
                }
                textToDisplay={user?.referralCode ?? 'You dont have a code'}
            />
            <form onSubmit={handleFormSubmit}>
                <div className="w-100 h-100 grid-cols-gap-28 grid grid-rows-3 gap-x-6 gap-y-2 lg:grid-cols-4">
                    <Input
                        className="border-0 lg:col-start-1 lg:col-end-3"
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        name="fullName"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                    />

                    <Input
                        className="lg:col-start-3 lg:col-end-5"
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
                        className="lg:col-start-1 lg:col-end-3 "
                    />
                    <Input
                        className="lg:col-start-3 lg:col-end-4 "
                        type="text"
                        label="Weight"
                        placeholder="0 kg"
                        name="weight"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                    />
                    <Input
                        className="lg:col-start-4 lg:col-end-5 "
                        type="text"
                        label="Height"
                        placeholder="0 sm"
                        name="height"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                    />
                    <Input
                        className="border-0 lg:col-start-1 lg:col-end-5"
                        type="text"
                        label="Location"
                        placeholder="Kyiv, Ukraine"
                        name="location"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                    />
                </div>
                <div className="flex">
                    <Radio
                        id="radio-male"
                        name="gender"
                        label="male"
                        value={Gender.MALE}
                        control={control}
                        type="card"
                        className="rounded-bl-5 lg:w-83 rounded-l-lg "
                    />
                    <Radio
                        id="radio-female"
                        name="gender"
                        label="female"
                        value={Gender.FEMALE}
                        control={control}
                        type="card"
                        className="lg:w-83"
                    />
                    <Radio
                        id="radio-other"
                        name="gender"
                        label="prefer not to say"
                        value={Gender.OTHER}
                        control={control}
                        type="card"
                        className="lg:w-50 rounded-r-lg"
                    />
                </div>
                <div className="mt-4">
                    <Checkbox
                        name="isPublic"
                        label="I agree to share my private information publicly on this platform."
                        ariaLabel="privacy-policy"
                        control={control}
                        errors={errors}
                    />
                </div>
                <ul className="mt-14 flex justify-end lg:mt-6">
                    <li className="mr-6 w-[150px]">
                        <Button
                            label="Reset"
                            onClick={handleReset}
                            variant={ButtonVariant.SECONDARY}
                            size={ComponentSize.MEDIUM}
                        />
                    </li>
                    <li className="w-[150px]">
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
                            className={'w-[150px]'}
                        />
                    </li>
                </ul>

                <ReactRouterPrompt
                    when={isDirty}
                    beforeConfirm={handleSubmitLeaving}
                >
                    {({ isActive, onConfirm, onCancel }) => (
                        <Modal
                            isOpen={isActive}
                            title={
                                'Do you want to save changes before leaving?'
                            }
                            onClose={onCancel}
                        >
                            <div className={'flex gap-4'}>
                                <Button
                                    label={isLoading ? '' : 'Save'}
                                    leftIcon={
                                        isLoading && (
                                            <Loader
                                                color={IconColor.SECONDARY}
                                            />
                                        )
                                    }
                                    onClick={onConfirm}
                                    variant={ButtonVariant.PRIMARY}
                                    size={ComponentSize.MEDIUM}
                                />
                                <Button
                                    label="Discard changes"
                                    variant={ButtonVariant.SECONDARY}
                                    size={ComponentSize.MEDIUM}
                                    onClick={onConfirm}
                                />
                            </div>
                        </Modal>
                    )}
                </ReactRouterPrompt>
            </form>
        </div>
    );
};

export { ProfileSettings };
