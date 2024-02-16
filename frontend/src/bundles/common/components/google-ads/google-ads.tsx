type GoogleAdsProperties = {
    children: React.ReactNode;
};

const GoogleAds: React.FC<GoogleAdsProperties> = ({ children }) => {
    return (
        <div className="bg-lm-yellow-200 flex w-full flex-wrap items-center justify-center">
            {children || (
                <p className="text-lm-black-300 text-center">
                    Your advertisement may be here
                </p>
            )}
        </div>
    );
};

export { GoogleAds };
