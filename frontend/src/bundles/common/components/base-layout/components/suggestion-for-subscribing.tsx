import { getTimestampNDaysAgo } from '~/bundles/common/components/base-layout/helpers/helpers.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type SubscriptionGetItemResponseDto } from '~/bundles/common/enums/enums.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { useAppSelector, useCallback } from '../../../hooks/hooks.js';
import { Button, ButtonVariant, Modal } from '../../components.js';

const SuggestionForSubscribing: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const { currentSubscription } = useAppSelector(({ subscriptions }) => {
        return {
            currentSubscription:
                subscriptions?.currentSubscription as SubscriptionGetItemResponseDto,
        };
    });

    useEffect(() => {
        const lastSuggestionTimeString =
            localStorage.getItem('lastSuggestionTime');
        const lastSuggestionTime = lastSuggestionTimeString
            ? Number.parseInt(lastSuggestionTimeString, 10)
            : null;
        const oneWeekAgo = getTimestampNDaysAgo({ days: 7 });

        if (
            !currentSubscription &&
            (!lastSuggestionTime || lastSuggestionTime < oneWeekAgo)
        ) {
            setIsModalOpen(true);
        }
    }, [currentSubscription]);

    const handleCloseModal = useCallback((): void => {
        localStorage.setItem('lastSuggestionTime', String(Date.now()));
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const handleNavigateToSubscriptionPage = useCallback((): void => {
        localStorage.setItem('lastSuggestionTime', String(Date.now()));
        navigate(AppRoute.PROFILE_SUBSCRIPTION);
        setIsModalOpen(false);
    }, [navigate, setIsModalOpen]);

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
                />
                <Button
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.SECONDARY}
                    label="Cancel"
                    onClick={handleCloseModal}
                />
            </div>
        </Modal>
    );
};

export { SuggestionForSubscribing };
