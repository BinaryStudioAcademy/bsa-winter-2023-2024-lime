import { userUpdateProfile } from 'shared/src/bundles/users/validation-schemas/user-update-profile.validation-schema.js';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

import { DEFAULT_UPDATE_PROFILE_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserUpdateProfileRequestDto) => void;
};

const ProfileSettings: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } =
        useAppForm<UserUpdateProfileRequestDto>({
            defaultValues: DEFAULT_UPDATE_PROFILE_PAYLOAD,
            validationSchema: userUpdateProfile,
        });
    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );
    return (
        <form
            className="bg-lm-black-100 w-100 h-100"
            onSubmit={handleFormSubmit}
        >
            <Input
                type="text"
                label="Full Name"
                placeholder="Full name"
                name="fullname"
                control={control}
                errors={errors}
            />
            <Input
                type="text"
                label="Nickname"
                placeholder="MyNickname2024"
                name="nickname"
                control={control}
                errors={errors}
            />
            <Input
                type="text"
                label="Date of birth"
                placeholder="dd/mm/yyyy"
                name="birthdate"
                control={control}
                errors={errors}
            />
            <Input
                type="text"
                label="Weight"
                placeholder="0 kg"
                name="weight"
                control={control}
                errors={errors}
            />
            <Input
                type="text"
                label="Height"
                placeholder="0 sm"
                name="height"
                control={control}
                errors={errors}
            />
            <Button
                type="submit"
                label="Sign up"
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
            />
        </form>
    );
};

export { ProfileSettings };
