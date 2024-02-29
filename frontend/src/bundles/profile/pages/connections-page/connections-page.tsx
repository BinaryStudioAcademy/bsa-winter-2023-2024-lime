import { ConnectionOption } from './components/connection-option.js';
import { connectionOptionsData } from './constants/constants.js';

const ConnectionsPage = (): JSX.Element => {
    return (
        <div className={'flex flex-col gap-4'}>
            {connectionOptionsData.map((option, id) => (
                <ConnectionOption
                    key={id}
                    title={option.title}
                    description={option.description}
                    iconName={option.iconName}
                />
            ))}
        </div>
    );
};

export { ConnectionsPage };
