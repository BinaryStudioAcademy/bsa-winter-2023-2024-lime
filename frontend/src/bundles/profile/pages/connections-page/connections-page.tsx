import { ConnectionOption } from './components/connection-option.js';

const ConnectionsPage = (): JSX.Element => {
    return (
        <div className={'mt-10 px-5 sm:px-8 md:px-10'}>
            <ConnectionOption />
        </div>
    );
};

export { ConnectionsPage };
