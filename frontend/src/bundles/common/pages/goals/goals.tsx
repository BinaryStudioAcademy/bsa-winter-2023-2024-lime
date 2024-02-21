import { PlusIcon } from '@heroicons/react/16/solid';

import {
    AchievementCard,
    Button,
    ButtonVariant,
    GoalCard,
    GoalVariant,
} from '~/bundles/common/components/components.js';
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

const challenges = [
    { name: 'Running Challenge 1', id: '1', type: 'fitness' },
    { name: 'Running Challenge 2', id: '2', type: 'running' },
    { name: 'Running Challenge 3', id: '3', type: 'running' },
    { name: 'Running Challenge 4', id: '4', type: 'running' },
    { name: 'Running Challenge 5', id: '5', type: 'running' },
    { name: 'Running Challenge 6', id: '6', type: 'fitness' },
];

const achievements = [
    {
        name: 'Running on Track 1',
        id: '1',
        date: '11/11/2024',
        quantity: '04 Rounds',
    },
    {
        name: 'Push Up 1',
        id: '2',
        date: '13/11/2024',
        quantity: '50 Pieces',
    },
    {
        name: 'Running on Track 2',
        id: '3',
        date: '11/09/2024',
        quantity: '04 Rounds',
    },
    { name: 'Push Up 2', id: '4', date: '11/10/2024', quantity: '50 Pieces' },
    {
        name: 'Running on Track 5',
        id: '5',
        date: '11/11/2024',
        quantity: '04 Rounds',
    },
];

const Goals: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback((): void => {
        void setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        void setIsModalOpen(false);
    }, []);

    // const handleAddGoal = useCallback((): void => {}, []);

    return (
        <main className="bg-lm-black-200 flex h-screen gap-10 px-8 pb-14 pt-10">
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                        Goals
                    </h2>
                    <div className="bg-lm-yellow-100 h-[160px] w-full rounded-xl"></div>
                </div>
                <div>
                    <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                        Challenges
                    </h2>
                    <ul className="flex w-[49rem] flex-wrap gap-4">
                        {challenges.map(({ id, name, type }) => (
                            <li key={id} className="h-[7.5rem] basis-96">
                                <GoalCard
                                    title={name}
                                    frequency="100 days"
                                    variant={
                                        type === 'fitness'
                                            ? GoalVariant.FITNESS
                                            : GoalVariant.RUNNING
                                    }
                                />
                            </li>
                        ))}

                        <Button
                            type="button"
                            label="Set the new goal"
                            variant={ButtonVariant.SECONDARY}
                            size={ComponentSize.LARGE}
                            leftIcon={<PlusIcon className="w-6" />}
                            className="h-[7.5rem] basis-96"
                            onClick={handleOpenModal}
                        />
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                    Achievements
                </h2>
                <ul className="flex flex-col gap-4 overflow-y-auto">
                    {achievements.map(({ id, name, date, quantity }) => (
                        <li key={id} className="h-[4.125rem] w-80">
                            <AchievementCard
                                title={name}
                                date={date}
                                quantity={quantity}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Set the new goal"
                onClose={handleCloseModal}
            />
        </main>
    );
};

export { Goals };
