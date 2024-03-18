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
    Radio,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize, Gender } from '~/bundles/common/enums/enums.js';
import {
    configureDateString,
    configureISOString,
    convertHeightToCentimeters,
    convertHeightToMillimeters,
    convertWeightToGrams,
    convertWeightToKilograms,
    getObjectKeys,
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

import { constructReferralUrl } from '../../helpers/helpers.js';
import { UserBonusBalance } from '../user-balance/user-bonus-balance.js';
import { Cropper } from './components/components.js';
import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';

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

    const [valuesDefault, setValuesDefault] = useState(false);
    const { user, updateProfile } = useAppSelector(({ auth }) => auth);
    const { userBonusesStatus, userBonusesTransactions } = useAppSelector(
        ({ userBonuses }) => userBonuses,
    );

    const { control, errors, reset, setValue, handleSubmit, getValues } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
            mode: 'onTouched',
            shouldUnregister: false,
        });

    const selectImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setImgToCrop('');

            const image = event.target.files;
            if (image) {
                setImgToCrop(URL.createObjectURL(image[0] as File));
                setIsOpen(true);
                event.target.value = '';
            }
        },
        [],
    );

    useEffect(() => {
        if (!valuesDefault && user) {
            for (const key of getObjectKeys(DEFAULT_UPDATE_PROFILE_PAYLOAD)) {
                switch (key) {
                    case 'dateOfBirth': {
                        setValue(
                            key,
                            user.dateOfBirth
                                ? configureDateString(user.dateOfBirth)
                                : '',
                        );
                        break;
                    }
                    case 'weight': {
                        setValue(
                            key,
                            convertWeightToKilograms(user[key]) || '',
                        );
                        break;
                    }
                    case 'height': {
                        setValue(
                            key,
                            convertHeightToCentimeters(user[key]) || '',
                        );
                        break;
                    }
                    default: {
                        setValue(
                            key,
                            user[key] || DEFAULT_UPDATE_PROFILE_PAYLOAD[key],
                        );
                    }
                }
            }
            setValuesDefault(true);
        }
    }, [user, setValue, valuesDefault]);

    useEffect(() => {
        if (updateProfile.avatarUrl) {
            setValue('avatarUrl', updateProfile.avatarUrl);
            dispatch(authActions.clearUpdateProfile());
        }
    }, [updateProfile, setValue, dispatch]);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit((data) => {
                const payload: UserUpdateProfileRequestDto = {
                    ...data,
                    avatarUrl: data.avatarUrl || null,
                    isPublic: getValues().isPublic,
                    location: data.location ? data.location.trim() : null,
                    weight: convertWeightToGrams(data.weight),
                    height: convertHeightToMillimeters(data.height),
                    dateOfBirth: data.dateOfBirth
                        ? configureISOString(data.dateOfBirth || '')
                        : null,
                    fullName: (data.fullName || '').trim(),
                    username: data.username ? data.username.trim() : null,
                };

                onSubmit(payload);
            })(event_);
        },
        [handleSubmit, onSubmit, getValues],
    );

    const closeModal = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setValue('isPublic', event.target.checked);
        },
        [setValue],
    );

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
                <div className=" w-100 h-100 grid-cols-gap-28 grid grid-rows-3 gap-x-6 lg:grid-cols-4">
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
                        onChange={handleCheckboxChange}
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
            </form>
        </div>
    );
};

export { ProfileSettings };
