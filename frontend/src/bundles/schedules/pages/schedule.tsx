import {
    CalendarDaysIcon as ScheduleIcon,
    PlusIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';

import {
    Button,
    ButtonVariant,
    CreateScheduleForm,
    DateCalendar,
    Loader,
    Modal,
    ScheduleCard,
} from '~/bundles/common/components/components.js';
import { ComponentSize, DataStatus } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type CreateScheduleRequest } from '~/bundles/common/types/types.js';
import { FrequencyType } from '~/bundles/goals/enums/enums.js';
import { actions as goalActions } from '~/bundles/goals/store/goals.js';
import { actions as scheduleActions } from '~/bundles/schedules/store/schedules.js';

import { DEFAULT_CALENDAR_VALUE } from '../constants/constants.js';
import { convertDateToIso, isDateInRange } from '../helpers/helpers.js';
import { type ScheduleRequestDto } from '../types/types.js';

const ZERO_VALUE = 0;

const Schedule: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { control, watch } = useAppForm({
        mode: 'onTouched',
        shouldUnregister: false,
        defaultValues: DEFAULT_CALENDAR_VALUE,
    });

    const watchedDate = watch('date');

    const { dataStatus: goalsDataStatus, goals } = useAppSelector(
        ({ goals }) => goals,
    );

    const { dataStatus: scheduleDataStatus, schedules } = useAppSelector(
        ({ schedules }) => schedules,
    );

    const addScheduleHandler = useCallback(
        ({ activity, goalLabel, dateOfStart }: CreateScheduleRequest) => {
            const convertedDate = convertDateToIso(
                dateOfStart,
                'dd/MM/yyyy HH:mm',
            );
            const preparedData: ScheduleRequestDto = {
                activityType: activity,
                goalId: goalLabel as number,
                startAt: convertedDate as unknown as Date,
            };
            void dispatch(scheduleActions.createSchedule(preparedData));
            setIsModalOpen((previousState) => !previousState);
        },
        [dispatch],
    );

    const PLURAL = 's';
    const DAY_PREPOSITION = 'a';
    const WEEK_PREPOSITION = 'per';

    const goalsList = useMemo(() => {
        return goals.map(({ activityType, id, frequency, frequencyType }) => ({
            value: id,
            label: `
                 ${capitalizeFirstLetter(activityType)} ${frequency} time${frequency > 1 ? PLURAL : ''}
                 ${
                     frequencyType === FrequencyType.DAY
                         ? DAY_PREPOSITION
                         : WEEK_PREPOSITION
                 }
                 ${frequencyType}
            `,
        }));
    }, [goals]);

    const filteredSchedules = useMemo(() => {
        const START_TIME = 0;
        const END_TIME = 1;
        const formattedDates = watchedDate.map((item) =>
            convertDateToIso(item, 'yyyy/MM/dd'),
        );

        const range = [...new Set(formattedDates)];

        return schedules.filter((schedule) => {
            const start = range[START_TIME] ?? String(ZERO_VALUE);
            const end = range[END_TIME];

            return isDateInRange(schedule.startAt, start, end);
        });
    }, [watchedDate, schedules]);

    const handleModalStatus = useCallback(() => {
        setIsModalOpen((previousState) => !previousState);
    }, []);

    useEffect(() => {
        if (isModalOpen && goalsDataStatus !== DataStatus.FULFILLED) {
            void dispatch(goalActions.getGoals());
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (scheduleDataStatus !== DataStatus.FULFILLED) {
            void dispatch(scheduleActions.getSchedules());
        }
    }, [dispatch]);

    const isSchedulesLoading = scheduleDataStatus === DataStatus.PENDING;

    return (
        <>
            <section className="relative flex h-full">
                {isSchedulesLoading ? (
                    <Loader isOverflow />
                ) : (
                    <>
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
                            {filteredSchedules.length > 0 ? (
                                <div className="mb-3">
                                    <ul>
                                        {filteredSchedules.map(
                                            ({ activityType, id, startAt }) => {
                                                const date = new Date(startAt);
                                                const weekDay = format(
                                                    date,
                                                    'EEEE',
                                                );
                                                const hours = format(
                                                    date,
                                                    'HH',
                                                );
                                                const minutes = format(
                                                    date,
                                                    'mm',
                                                );

                                                return (
                                                    <ScheduleCard
                                                        weekDay={weekDay ?? ''}
                                                        activityType={
                                                            activityType
                                                        }
                                                        date={`${hours}:${minutes}`}
                                                        key={id}
                                                    />
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                <div className="font-base text-primary mb-[1.75rem] flex items-center text-xl">
                                    <p className="mr-3">
                                        At this date, you don&#39;t have any
                                        schedules yet
                                    </p>
                                    <ScheduleIcon className="h-6 w-6" />
                                </div>
                            )}
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
                    </>
                )}
            </section>
            <Modal
                isOpen={isModalOpen}
                title="Set the new shcedule"
                onClose={handleModalStatus}
            >
                <CreateScheduleForm
                    onSubmit={addScheduleHandler}
                    isLoading={false}
                    goalsList={
                        goalsList.length > ZERO_VALUE
                            ? [...goalsList, { value: '', label: 'None' }]
                            : goalsList
                    }
                />
            </Modal>
        </>
    );
};

export { Schedule };
