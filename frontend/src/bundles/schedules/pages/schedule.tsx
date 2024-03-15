import { PlusIcon } from '@heroicons/react/16/solid';

import {
    Button,
    ButtonVariant,
    CreateScheduleForm,
    DateCalendar,
    Modal,
    ScheduleCard,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useAppSelector,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type CreateScheduleRequest } from '~/bundles/common/types/types.js';
import { FrequencyType } from '~/bundles/goals/enums/enums.js';
import { convertDateToIso } from '~/bundles/schedules/helpers/helpers.js';

import { DEFAULT_CALENDAR_VALUE } from '../constants/constants.js';
import { type ScheduleRequestDto } from '../types/types.js';

const ZERO_VALUE = 0;

const Schedule: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { control } = useAppForm({
        mode: 'onTouched',
        shouldUnregister: false,
        defaultValues: DEFAULT_CALENDAR_VALUE,
    });

    const { goals } = useAppSelector(({ goals }) => goals);

    const addScheduleHandler = useCallback(({ activity, goalLabel, dateOfStart }: CreateScheduleRequest) => {
        const convertedDate = convertDateToIso(dateOfStart);
        const preparedData: ScheduleRequestDto = {
            activityType: activity,
            goalId: goalLabel,
            startAt: convertedDate as unknown as Date
        };
        console.log(preparedData);
    }, []);

    const PLURAL = 's';
    const DAY_PREPOSITION = 'a';
    const WEEK_PREPOSITION = 'per';

    const goalsList = useMemo(() => {
        return goals.map(({ activityType, id, frequency, frequencyType }) => ({
            value: id,
            label: `
                 ${capitalizeFirstLetter(activityType)} ${frequency} time${frequency > 1 ? PLURAL: ''}
                 ${
                     frequencyType === FrequencyType.DAY
                         ? DAY_PREPOSITION
                         : WEEK_PREPOSITION
                 }
                 ${frequencyType}
            `,
        }));
    }, [goals]);

    const handleModalStatus = useCallback(() => {
        setIsModalOpen((previousState) => !previousState);
    }, []);

    return (
        <>
            <section className="relative flex h-full">
                <div className="my-[-2rem] ml-[-2rem]">
                    <div className="bg-secondary flex h-full w-[20rem] flex-col gap-[1.75rem] overflow-auto p-[2rem]">
                        <h1 className="text-primary text-xl font-bold">
                            My Schedule
                        </h1>
                        <DateCalendar
                            name="date"
                            control={control}
                            range={true}
                            minDate={new Date()}
                        />
                    </div>
                </div>
                <div className="border-lm-black-400 my-[-2rem] h-[calc(100%+4rem)] border"></div>
                <div className="w-full px-[2rem]">
                    <div className="mb-3">
                        <ul>
                            <ScheduleCard
                                weekDay="Monday"
                                activityType="walking"
                                date="08:00"
                            />
                            <ScheduleCard
                                weekDay="Wednesday"
                                activityType="running"
                                date="08:00"
                            />
                            <ScheduleCard
                                weekDay="Friday"
                                activityType="cycling"
                                date="08:00"
                            />
                        </ul>
                    </div>
                    <div className="md:w-full lg:w-[48.8%]">
                        <Button
                            type="button"
                            label="Set the new shcedule"
                            variant={ButtonVariant.SECONDARY}
                            size={ComponentSize.LARGE}
                            leftIcon={<PlusIcon className="w-6" />}
                            className="h-[6.75rem] sm:text-sm md:text-xl"
                            onClick={handleModalStatus}
                        />
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isModalOpen}
                title="Set the new shcedule"
                onClose={handleModalStatus}
            >
                <CreateScheduleForm
                    onSubmit={addScheduleHandler}
                    isLoading={false}
                    goalsList={goalsList.length > ZERO_VALUE ? [...goalsList, { value: '', label: 'None' }] : goalsList}
                />
            </Modal>
        </>
    );
};

export { Schedule };
