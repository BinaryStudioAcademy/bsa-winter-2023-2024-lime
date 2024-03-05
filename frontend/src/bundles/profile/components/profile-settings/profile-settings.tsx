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
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize, Gender } from '~/bundles/common/enums/enums.js';
import { RadioType } from '~/bundles/common/enums/radio-type.enum.js';
import {
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserUpdateProfileRequestDto,
    userUpdateProfileValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';
import { Cropper } from './cropper.js';

type Properties = {
    onSubmit: (payload: FormData) => void;
    isLoading: boolean;
};

const extractNumbers = (value: string | undefined | null): string => {
    return (value ?? '').trim().replaceAll(/\D/g, '');
};

const ProfileSettings: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const [imgToCrop, setImgToCrop] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [imgFile, setImgFile] = useState<File>();

    const userId = useAppSelector((state) => state.auth.user?.id);
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));

    useEffect(() => {
        const dataUrlToFile = async (): Promise<void> => {
            const response = await fetch(avatar);
            const blob = await response.blob();
            const file = new File([blob], 'image', { type: blob.type });
            setImgFile(file);
        };
        avatar && void dataUrlToFile();
    }, [avatar]);

    const { control, errors, reset, getValues } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfileValidationSchema,
            mode: 'onTouched',
            shouldUnregister: false,
        });

    const closeModal = useCallback((): void => {
        setImgToCrop('');
        setIsOpen(false);
    }, []);

    const uploadAvatar = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setImgToCrop('');
            const pic = event.target.files;

            if (pic) {
                setImgToCrop(URL.createObjectURL(pic[0] as File));
                setIsOpen(true);
            }
        },
        [],
    );

    const getImgCropped = useCallback((img: string) => {
        setAvatar(img);
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            const form = new FormData();
            form.append('gender', getValues().gender as string);
            form.append('dateOfBirth', getValues().dateOfBirth as string);
            form.append('avatarUrl', imgFile as File);
            form.append('fullName', getValues().fullName as string);
            form.append('username', getValues().username as string);
            form.append('weight', extractNumbers(getValues().weight));
            form.append('height', extractNumbers(getValues().height));
            form.append('id', userId?.toString() as string);

            onSubmit(form);
            reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
        },
        [onSubmit, getValues, userId, reset, imgFile],
    );

    const handleCancel = useCallback((): void => {
        setImgFile(undefined);
        setAvatar('');
        setImgToCrop('');
        void reset(DEFAULT_UPDATE_PROFILE_PAYLOAD);
    }, [reset]);

    return (
        <div className="bg-lm-black-200 pl-13 pr-18 h-screen px-12 pb-9 pt-3 lg:w-[874px]">
            <div className="flex items-center pb-12">
                <Avatar
                    size="lg"
                    email={user ? user?.email : ''}
                    avatarUrl={avatar ?? user?.avatarUrl}
                />

                <input
                    id="avatarInput"
                    type="file"
                    accept="image/jpeg, image/png"
                    name="avatarUrl"
                    onChange={uploadAvatar}
                    className="hidden"
                />
                <label
                    htmlFor="avatarInput"
                    className="w-115 border-lm-yellow-100 text-lm-yellow-100 hover:border-lm-yellow-200 hover:text-lm-yellow-200 ml-3 flex h-[38px] cursor-pointer items-center justify-center rounded-[20px] border font-extrabold"
                >
                    Update file
                </label>
                <Modal
                    isOpen={isOpen}
                    title="Crop your avatar"
                    onClose={closeModal}
                >
                    <Cropper
                        image={imgToCrop}
                        getImgCropped={getImgCropped}
                        closeModal={setIsOpen}
                    />
                </Modal>
            </div>
            <form
                className=" w-100 h-100 grid-cols-gap-28 grid grid-rows-2 gap-x-6 lg:grid-cols-4"
                onSubmit={handleFormSubmit}
            >
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
                <div className="flex lg:col-start-1 lg:col-end-3">
                    <Radio
                        id="radio-male"
                        name="gender"
                        label="Male"
                        value={Gender.MALE}
                        control={control}
                        type={RadioType.CARD}
                        className="rounded-bl-5 lg:w-83 rounded-l-lg "
                    />
                    <Radio
                        id="radio-female"
                        name="gender"
                        label="Female"
                        value={Gender.FEMALE}
                        control={control}
                        type={RadioType.CARD}
                        className="lg:w-83"
                    />
                    <Radio
                        id="radio-other"
                        name="gender"
                        label="Prefer not to say"
                        value={Gender.OTHER}
                        control={control}
                        type={RadioType.CARD}
                        className="lg:w-50 rounded-r-lg"
                    />
                </div>
                <ul className="mt-14 flex lg:col-start-3 lg:col-end-5 lg:row-start-4 lg:mt-6">
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
