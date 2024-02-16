import { Button } from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconSize,
} from '~/bundles/common/components/icon/enums/enums.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';

import styles from '../styles.module.css';

const ConnectionOption = (): JSX.Element => {
    return (
        <div className={styles['option']}>
            <div className={'option-header'}>
                <div className={styles['option-icon']}>
                    <Icon
                        name="logoIcon"
                        color={IconColor.PRIMARY}
                        size={IconSize.MEDIUM}
                    />
                </div>
                <div>
                    <h2 className={styles['option-title']}>Some title</h2>
                    <p className={styles['option-subtitle']}>Some sub title</p>
                </div>
                <Button variant={'primary'} size={'small'} label={'Action'} />
            </div>
            <p className={styles['option-description']}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis debitis, accusamus, quis harum a dolorem laboriosam
                architecto quibusdam aliquam, asperiores repellendus. Est quo
                veritatis architecto natus. Minima sint ipsum amet.
            </p>
        </div>
    );
};

export { ConnectionOption };
