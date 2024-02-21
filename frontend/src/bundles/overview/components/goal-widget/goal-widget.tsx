import { Icon } from '~/bundles/common/components/components.js';

import { CircularProgress } from './components/components.js';

type WidgetProperties = {
    title: string;
    value: number;
    target: number;    
} ;

const GoalWidget = ({
    title = 'Track Your Daily Activities',
    value = 6,
    target = 10
}: WidgetProperties ) : JSX.Element => {
    return (
        <div className="flex items-center max-w-[50rem] bg-gradient-to-r from-lm-yellow-100 to-transparent rounded-xl">
            <div className="w-4/6 p-4 bg-gray-200">
                <p className='font-bolder text-[24px]'>{title}</p>                
            </div>
            <div className="w-3/6 flex items-center justify-end">
                <div className="w-1/4 text-white flex">
                    <Icon name='logoIcon' size='md'></Icon>
                    <p className='font-extrabold text-md'>Exercises</p>
                </div>
                <div className="w-2/4 flex items-center justify-center">
                    <CircularProgress value={value} target={target} />
                    <div className='absolute text-white'>
                        <p className='text-4xl inline-flex font-extrabold font-gilroy'>{value}</p>
                        <p className='inline-flex font-normal'>/{target}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GoalWidget };