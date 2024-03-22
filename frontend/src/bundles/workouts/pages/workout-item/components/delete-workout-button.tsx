import {
    Button,
    ButtonVariant,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions } from '~/bundles/workouts/store/workouts.js';

type Properties = {
    id: number;
};

const DeleteWorkoutButton: React.FC<Properties> = ({ id }): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleDeleteWorkout = useCallback((): void => {
        void dispatch(actions.deleteWorkout(id));
    }, [dispatch, id]);

    return (
        <div className="mt-[0.5rem] inline-flex">
            <Button
                label="Delete workout"
                variant={ButtonVariant.DANGER}
                onClick={handleDeleteWorkout}
                size={ComponentSize.SMALL}
                className="max-w-[10rem]"
            />
        </div>
    );
};

export { DeleteWorkoutButton };
