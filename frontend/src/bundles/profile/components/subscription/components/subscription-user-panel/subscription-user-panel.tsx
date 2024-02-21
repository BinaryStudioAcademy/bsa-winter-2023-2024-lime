const SubscriptionUserPanel = (): JSX.Element => {
    return (
        <div
            className={
                'bg-lm-yellow-100 w-full max-w-[30rem] rounded-2xl p-4 md:p-6'
            }
        >
            <div>
                <h3 className={'mb-2 text-center text-xl font-extrabold'}>
                    Hi,{' '}
                </h3>
                <div>
                    <div
                        className={
                            'border-lm-black-100 rounded-md border-2 p-5'
                        }
                    >
                        <p className="text-lm-grey-300 text-lg font-bold">
                            Your Subscription
                        </p>
                        <p className={'text-3xl font-extrabold'}></p>
                        <div>
                            <p className="text-lm-grey-300 text-lg font-bold">
                                Renews on
                            </p>
                            <p className={'text-2xl font-bold'}></p>
                        </div>
                        <div>
                            <p className="text-lm-grey-300 text-lg font-bold">
                                Payment
                            </p>
                            <p className={'text-2xl font-bold'}>$ / month</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SubscriptionUserPanel };
