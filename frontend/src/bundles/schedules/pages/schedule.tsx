import { DateCalendar } from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook.js';

import { DEFAULT_CALENDAR_VALUE } from '../constants/constants.js';

const Schedule: React.FC = () => {
    const { control } = useAppForm({
        mode: 'onTouched',
        shouldUnregister: false,
        defaultValues: DEFAULT_CALENDAR_VALUE,
    });

    return (
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
        </section>
    );
};

export { Schedule };
