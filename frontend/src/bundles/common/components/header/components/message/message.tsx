const Message = (): JSX.Element => {
    return (
        <div className="flex flex-col justify-center gap-0.5">
            <p className="text-lm-grey-300 text-[0.5rem] font-normal md:text-[0.625rem]">
                Good Morning
            </p>
            <p className="md:h5 text-lm-grey-300 text-[0.625rem] font-bold sm:text-sm">
                Welcome Back!
            </p>
        </div>
    );
};

export { Message };
