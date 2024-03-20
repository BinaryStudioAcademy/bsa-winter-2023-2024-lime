import { type GoalResponseDto } from 'shared/src/bundles/goals/goals.js';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

const getUserAge = (dateOfBirth: string | null): string => {
    if (!dateOfBirth) {
        return '-';
    }

    const ageDifMs = Date.now() - new Date(dateOfBirth).getTime();
    return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970).toString();
};

const getInfoAboutUserContext = ({
    user,
    userGoal,
}: {
    user: UserAuthResponseDto;
    userGoal: GoalResponseDto | null;
}): {
    role: ValueOf<typeof SenderType>;
    content: string;
} => {
    const { fullName, username, weight, height, gender, dateOfBirth } = user;

    const frequency = userGoal
        ? `${userGoal.frequency} ${userGoal.frequencyType}`
        : '-';

    const builder = {
        instruction: 'Provide relevant answer based on these requirements:',
        callUser:
            username || fullName ? `Call user as ${username || fullName}.` : '',
        userParameters: `User body parameters: \nAge: ${getUserAge(dateOfBirth)}\nWeigth (kg): ${weight ?? '-'}\nHeight (cm): ${height ?? '-'}\nGender: ${gender ?? '-'}.`,
        userLastGoal: userGoal
            ? `Lastest goal:\nActivity type: ${userGoal.activityType ?? '-'}\nFrequency:  ${frequency}\nDistance (m): ${userGoal.distance ?? '-'}\nDuration (min): ${userGoal.duration ?? '-'}.`
            : '',
    } as const;

    return {
        role: SenderType.ASSISTANT,
        content: Object.values(builder)
            .map((key) => key)
            .join('\n\n'),
    };
};

export { getInfoAboutUserContext };
