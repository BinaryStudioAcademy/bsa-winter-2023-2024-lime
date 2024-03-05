type GoogleAdsProperties = {
    children: React.ReactNode;
};

const GoogleAds: React.FC<GoogleAdsProperties> = ({ children }) => {
    return (
        <div className="bg-primary bg-rectangle font-manrope text-24 leading-33 flex w-full flex-wrap items-center justify-center rounded-lg text-center font-extrabold text-gray-700">
            {children ?? <p className="m-2">Your advertisement may be here</p>}
        </div>
    );
};

export { GoogleAds };
