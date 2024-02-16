type GoogleAdsProperties = {
    children: React.ReactNode;
};

const GoogleAds: React.FC<GoogleAdsProperties> = ({ children }) => {
    return (
        <div className='w-full bg-lm-yellow-200 flex flex-wrap items-center justify-center'>
            {children || <p className='text-center text-lm-black-300'> Your advertisement may be here</p>}
        </div>
    );
};

export { GoogleAds };
