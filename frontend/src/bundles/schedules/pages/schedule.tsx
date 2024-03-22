import {
    CalendarDaysIcon as ScheduleIcon,
    PlusIcon,
} from '@heroicons/react/16/solid';
import { type ChartData } from 'chart.js';
import { format, parseISO } from 'date-fns';

import {
    Button,
    ButtonVariant,
    CreateScheduleForm,
    DateCalendar,
    Loader,
    Modal,
    ScheduleCard,
} from '~/bundles/common/components/components.js';
import { DEFAULT_SCHEDULE_FORM_VALUE } from '~/bundles/common/components/create-schedule-form/constants/constants.js';
import {
    ComponentSize,
    DataStatus,
    Theme,
} from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    formatDateToIso,
} from '~/bundles/common/helpers/helpers.js';
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
import { ScheduleWidget } from '~/bundles/schedules/components/components.js';
import { actions as scheduleActions } from '~/bundles/schedules/store/schedules.js';

import {
    DAY_PREPOSITION,
    DEFAULT_CALENDAR_VALUE,
    DOUGHNUT_DATASET,
    LABEL,
    PLURAL,
    TIME_FORMAT,
    WEEK_PREPOSITION,
    ZERO_VALUE,
} from '../constants/constants.js';
import { useFilteredSchedules } from '../hooks/hooks.js';
import { type ScheduleRequestDto } from '../types/types.js';

const Schedule: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [baseFormValue, setBaseFormValue] = useState<CreateScheduleRequest>(
        DEFAULT_SCHEDULE_FORM_VALUE,
    );
    const dispatch = useAppDispatch();
    const { control, watch } = useAppForm({
        mode: 'onTouched',
        shouldUnregister: false,
        defaultValues: DEFAULT_CALENDAR_VALUE,
    });

    const watchedDate = watch('date');

    const { dataStatus: scheduleDataStatus, schedules } = useAppSelector(
        ({ schedules }) => schedules,
    );

    const { dataStatus: goalsDataStatus, goals } = useAppSelector(
        ({ goals }) => goals,
    );

    const { theme } = useAppSelector(({ theme }) => theme);

    const goalsList = useMemo(() => {
        return goals.map(({ activityType, id, frequency, frequencyType }) => {
            const capitalizedFirstLetter = `${capitalizeFirstLetter(activityType)} ${frequency} time${frequency > 1 ? PLURAL : ''}`;
            const frequencyTitle = `${
                frequencyType === FrequencyType.DAY
                    ? DAY_PREPOSITION
                    : WEEK_PREPOSITION
            }`;
            return {
                value: id,
                label: `${capitalizedFirstLetter}${frequencyTitle}${frequencyType}`,
            };
        });
    }, [goals]);

    const { randomGoal, filteredSchedules } = useFilteredSchedules(
        watchedDate,
        schedules,
        goals,
    );

    const doughnutData = useMemo((): ChartData<'doughnut'> | null => {
        if (!randomGoal) {
            return null;
        }
        const TOTAL_PERCENTAGE = 100;
        return {
            datasets: [
                {
                    data: [
                        TOTAL_PERCENTAGE - randomGoal.progress,
                        randomGoal.progress,
                    ],
                    ...DOUGHNUT_DATASET,
                    backgroundColor: [
                        theme === Theme.DARK
                            ? 'rgb(28, 34, 39)'
                            : 'rgb(121 131 146)',
                        'rgb(224 254 16)',
                    ],
                },
            ],
        };
    }, [randomGoal, theme]);

    const handleModalStatus = useCallback(() => {
        if (isUpdateMode) {
            setIsUpdateMode(false);
        }
        if (isModalOpen) {
            setBaseFormValue(DEFAULT_SCHEDULE_FORM_VALUE);
        }
        setIsModalOpen((previousState) => !previousState);
    }, [isModalOpen, isUpdateMode]);

    const onUpdate = useCallback(
        (id: number) => {
            const schedule = schedules.find((schedule) => schedule.id === id);
            if (schedule) {
                const date = parseISO(schedule.startAt);
                setBaseFormValue({
                    activity: schedule.activityType,
                    goalLabel: schedule.goalId ?? null,
                    dateOfStart: format(date, TIME_FORMAT),
                    id,
                });
                handleModalStatus();
                setIsUpdateMode(true);
            }
        },
        [schedules, handleModalStatus],
    );

    const onDelete = useCallback(
        (id: number) => {
            void dispatch(scheduleActions.deleteSchedule({ id: String(id) }));
        },
        [dispatch],
    );

    const scheduleHandler = useCallback(
        ({ activity, goalLabel, dateOfStart, id }: CreateScheduleRequest) => {
            const convertedDate = formatDateToIso(dateOfStart, TIME_FORMAT);

            const preparedData: ScheduleRequestDto = {
                activityType: activity,
                goalId: (goalLabel as number) || null,
                startAt: convertedDate,
            };

            if (isUpdateMode && id) {
                void dispatch(
                    scheduleActions.updateSchedule({
                        id: String(id),
                        payload: preparedData,
                    }),
                );
            } else {
                void dispatch(scheduleActions.createSchedule(preparedData));
            }

            handleModalStatus();
        },
        [dispatch, handleModalStatus, isUpdateMode],
    );

    useEffect(() => {
        void dispatch(goalActions.getGoals());
        void dispatch(scheduleActions.getSchedules());
    }, [dispatch]);

    const isLoading = [scheduleDataStatus, goalsDataStatus].includes(
        DataStatus.PENDING,
    );

    if (isLoading) {
        return <Loader isOverflow />;
    }

    return (
        <>
            <section className="relative flex h-full w-full flex-col gap-[1.2rem] lg:flex-row">
                <div>
                    <div className="bg-secondary flex h-full flex-col gap-[1.75rem]">
                        <h1 className="text-card text-xl font-bold">
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
                <div className="bg-primary my-[-2rem] hidden h-[calc(100%+4rem)] w-1 lg:block"></div>
                <div className="w-full max-w-none lg:max-w-[23.5rem] xl:max-w-none">
                    {filteredSchedules.length > 0 ? (
                        <div className="mb-3 flex flex-col gap-[1.2rem] xl:flex-row">
                            <ul className="flex w-full flex-col gap-[0.7rem] lg:max-w-[25rem]">
                                {filteredSchedules.map(
                                    ({ activityType, id, startAt }) => {
                                        const date = new Date(startAt);
                                        const weekDay = format(date, 'EEEE');
                                        const hours = format(date, 'HH');
                                        const minutes = format(date, 'mm');

                                        return (
                                            <ScheduleCard
                                                weekDay={weekDay ?? ''}
                                                activityType={activityType}
                                                id={id}
                                                isExpanded={true}
                                                key={id}
                                                date={`${hours}:${minutes}`}
                                                onUpdate={onUpdate}
                                                onDelete={onDelete}
                                            />
                                        );
                                    },
                                )}
                                <div className="bg-primary w-full">
                                    <Button
                                        type="button"
                                        label={LABEL}
                                        variant={ButtonVariant.SECONDARY}
                                        size={ComponentSize.LARGE}
                                        leftIcon={<PlusIcon className="w-6" />}
                                        className="h-[6.75rem] sm:text-sm md:text-xl"
                                        onClick={handleModalStatus}
                                    />
                                </div>
                            </ul>
                            {randomGoal && doughnutData && (
                                <ScheduleWidget
                                    goal={randomGoal}
                                    doughnutData={doughnutData}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="font-base text-primary mb-[1.75rem] flex items-center text-xl">
                            <p className="mr-3">
                                At this date, you don&#39;t have any schedules
                                yet
                            </p>
                            <ScheduleIcon className="h-6 w-6" />
                        </div>
                    )}
                    {filteredSchedules.length === ZERO_VALUE && (
                        <div className="w-full md:w-full xl:w-[48.8%]">
                            <Button
                                type="button"
                                label={LABEL}
                                variant={ButtonVariant.SECONDARY}
                                size={ComponentSize.LARGE}
                                leftIcon={<PlusIcon className="w-6" />}
                                className="h-[6.75rem] sm:text-sm md:text-xl"
                                onClick={handleModalStatus}
                            />
                        </div>
                    )}
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                title={isUpdateMode ? 'Update schedule' : LABEL}
                onClose={handleModalStatus}
            >
                <CreateScheduleForm
                    onSubmit={scheduleHandler}
                    isLoading={isLoading}
                    value={baseFormValue}
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
