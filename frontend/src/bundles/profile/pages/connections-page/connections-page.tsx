import { ConnectionOption } from './components/connection-option.js';
import { connectionOptionsData } from './constants/constants.js';

const ConnectionsPage = (): JSX.Element => {
    return (
        <div
            className={
                'bg-lm-black-200 flex flex-col gap-4 px-5 py-10 sm:px-8 md:px-10'
            }
        >
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
