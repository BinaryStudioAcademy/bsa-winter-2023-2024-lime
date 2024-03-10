import { differenceInDays } from 'date-fns';

import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as subscriptionActions } from '~/bundles/subscription/store/subscriptions.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { useAppSelector, useCallback } from '../../../hooks/hooks.js';
import { Button, ButtonVariant, Modal } from '../../components.js';
import { REMINDER_PERIOD } from '../constants/constants.js';

const SuggestionForSubscribing: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentSubscription = useAppSelector(
        ({ subscriptions }) => subscriptions.currentSubscription,
    );

    const setLastSuggestionTime = useCallback(async (): Promise<void> => {
        await storage.set(StorageKey.LAST_SUGGESTION_TIME, String(Date.now()));
    }, []);

    const handleCloseModal = useCallback(() => {
        void setLastSuggestionTime();
        setIsModalOpen(false);
    }, [setIsModalOpen, setLastSuggestionTime]);

    const handleNavigateToSubscriptionPage = useCallback(() => {
        void setLastSuggestionTime();
        navigate(AppRoute.PROFILE_SUBSCRIPTION);
        setIsModalOpen(false);
    }, [navigate, setIsModalOpen, setLastSuggestionTime]);

    const handleLoadCurrentSubscription = useCallback((): void => {
        void dispatch(subscriptionActions.loadCurrentSubscription());
    }, [dispatch]);

    useEffect(() => {
        handleLoadCurrentSubscription();
    }, [handleLoadCurrentSubscription]);

    useEffect(() => {
        const updateStorage = async (): Promise<void> => {
            if (!(await storage.get(StorageKey.LAST_SUGGESTION_TIME))) {
                await setLastSuggestionTime();
            }
        };
        void updateStorage();
    }, [setLastSuggestionTime]);

    useEffect(() => {
        const showModal = async (): Promise<void> => {
            const lastSuggestionTimeString =
                (await storage.get(StorageKey.LAST_SUGGESTION_TIME)) || '';
            const lastSuggestionTime =
                Number.parseInt(lastSuggestionTimeString, 10) || Date.now();
            const numberOfDaysAgo = differenceInDays(
                new Date(),
                lastSuggestionTime,
            );

            if (!currentSubscription && numberOfDaysAgo >= REMINDER_PERIOD) {
                setIsModalOpen(true);
            }
        };
        void showModal();
    }, [currentSubscription]);

    return (
        <Modal
            isOpen={isModalOpen}
            title={'Looks like you do not have subscription yet!'}
            onClose={handleCloseModal}
        >
            <div className="flex gap-2">
                <Button
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                    label="Subscribe"
                    onClick={handleNavigateToSubscriptionPage}
                    className={'mx-auto w-[150px]'}
                />
            </div>
        </Modal>
    );
};

export { SuggestionForSubscribing };
