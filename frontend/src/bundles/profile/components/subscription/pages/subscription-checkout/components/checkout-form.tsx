import { PaymentElement } from '@stripe/react-stripe-js';

import { Button } from '~/bundles/common/components/components.js';

const CheckoutForm: React.FC = () => {
    return (
        <form>
            <PaymentElement />
            <div>
                <Button
                    type="submit"
                    label="Pay now!"
                    variant={'primary'}
                    size={'medium'}
                />
            </div>
        </form>
    );
};

export { CheckoutForm };
