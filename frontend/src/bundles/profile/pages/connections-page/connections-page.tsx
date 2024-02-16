import { ConnectionOption } from './components/connection-option.js';
import styles from './styles.module.css';

const ConnectionsPage = (): JSX.Element => {
    return (
        <div className={styles['connections']}>
            <ConnectionOption />
        </div>
    );
};

export { ConnectionsPage };
