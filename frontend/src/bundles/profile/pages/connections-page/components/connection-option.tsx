import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

import { Button } from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';

import styles from '../styles.module.css';

const ConnectionOption = (): JSX.Element => {
    return (
        <div className={styles['option']}>
            <div className={styles['option-header']}>
                <div className={styles['option-header-left']}>
                    <Icon
                        name="youTubeIcon"
                        color={IconColor.PRIMARY}
                        className={`${styles['icon']}`}
                    />
                    <div className={styles['option-header-right']}>
                        <h2 className={'text-xl text-white'}>Youtube</h2>
                        <div
                            className={'flex items-center justify-center gap-2'}
                        >
                            <XCircleIcon className={'text-lm-red w-5'} />
                            <CheckCircleIcon
                                className={'text-lm-yellow-100 w-5'}
                            />
                            <p className={'text-lm-grey-200 text-base'}>
                                Link your youtube account
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    variant={'primary'}
                    size={'small'}
                    label={'Connect'}
                    className={'h-10 max-w-40'}
                />
            </div>
            <p className={'text-lm-grey-100 text-base'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis debitis, accusamus, quis harum a dolorem laboriosam
                architecto quibusdam aliquam, asperiores repellendus. Est quo
                veritatis architecto natus. Minima sint ipsum amet.
            </p>
        </div>
    );
};

export { ConnectionOption };
