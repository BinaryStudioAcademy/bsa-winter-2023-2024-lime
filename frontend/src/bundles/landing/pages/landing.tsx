import { motion } from 'framer-motion';

import { actions as appActions } from '~/app/store/app.js';
import FeatureBg from '~/assets/img/landing/feature-bg.svg?react';
import OverviewDarkImage from '~/assets/img/landing/overview-dark.png';
import OverviewLightImage from '~/assets/img/landing/overview-light.png';
import SignInDark from '~/assets/img/landing/sign-in-dark.png';
import SignInLight from '~/assets/img/landing/sign-in-light.png';
import {
    Button,
    ButtonVariant,
    Icon,
    Link,
    Navigate,
} from '~/bundles/common/components/components.js';
import {
    type IconName,
    IconColor,
} from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { Theme } from '~/bundles/common/enums/theme.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    Fade,
    FeatureCard,
    IntroCard,
    TestimonialCard,
    Zoom,
} from '../components/components.js';
import { FEATURES, TESTIMONIALS } from '../constants/constants.js';

const Landing = (): JSX.Element => {
    const { theme } = useAppSelector(({ theme }) => theme);
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch();

    const handleSignIn = useCallback((): void => {
        dispatch(appActions.navigate(AppRoute.SIGN_IN));
    }, [dispatch]);

    const handleSignUp = useCallback((): void => {
        dispatch(appActions.navigate(AppRoute.SIGN_UP));
    }, [dispatch]);

    const styles = {
        section: 'flex flex-col min-h-screen shrink-0 snap-start snap-always',
        container: 'container mx-auto',
        secondSection: {
            gradient:
                'after:absolute after:right-1/2 after:bottom-28 after:h-[39rem] after:w-[42rem] after:translate-x-1/2 after:translate-y-1/2 after:rounded-full after:bg-gradient-to-b after:from-[#E6E345] after:to-[#A1EE7D] after:opacity-20 after:blur-[100px]',
        },
        thirdSection: {
            gradient:
                'after:absolute after:bottom-0 after:left-0 after:-translate-x-1/4 after:translate-y-1/3 after:size-[22rem] after:z-[-1] after:rounded-full after:bg-gradient-to-b after:from-[#E6E345] after:to-[#A1EE7D] after:blur-[140px]',
        },
    };

    if (user) {
        return <Navigate to={AppRoute.OVERVIEW} />;
    }

    return (
        <main className="text-primary flex h-screen snap-y snap-mandatory flex-col gap-40 overflow-y-auto overflow-x-hidden">
            <section
                className={getValidClassNames(styles.section, styles.container)}
            >
                <header className="container mx-auto my-6 flex flex-row items-center justify-between">
                    <div>
                        <Link to={AppRoute.ROOT}>
                            {theme === Theme.DARK ? (
                                <Icon
                                    name="logoHeader"
                                    color={IconColor.PRIMARY}
                                    size={ComponentSize.EXTRA_LARGE}
                                    className="aspect-video max-h-12"
                                />
                            ) : (
                                <Icon
                                    name="logoHeaderLight"
                                    color={IconColor.PRIMARY}
                                    size={ComponentSize.EXTRA_LARGE}
                                    className="aspect-video max-h-12"
                                />
                            )}
                        </Link>
                    </div>
                    <nav className="hidden gap-6 md:flex">
                        <Link to={AppRoute.ROOT}>Home</Link>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#testimonials">Testimonials</a>
                    </nav>
                    <Button
                        size={ComponentSize.MEDIUM}
                        label="Sign In"
                        variant={ButtonVariant.PRIMARY}
                        className="basis-40"
                        onClick={handleSignIn}
                    />
                </header>
                <div className="flex flex-1 flex-col items-center justify-evenly gap-28 md:gap-0 lg:flex-row lg:justify-between">
                    <div className="md:w-[30rem] xl:w-[32rem]">
                        <div className="bg-secondary mb-[0.375rem] inline-block rounded-2xl px-4 py-2">
                            <p className="text-base font-bold leading-4">
                                <span className="mr-2 inline-flex items-baseline">
                                    <Icon
                                        name="workoutIcon"
                                        color={IconColor.PRIMARY}
                                        className="fill-lm-yellow-100 size-3"
                                    />
                                </span>
                                Live In Motion Everyday
                            </p>
                        </div>
                        <h1 className="font-heavybold mb-[1.5rem] text-[3.5rem] leading-[4rem]">
                            New way to track your progression
                        </h1>
                        <p className="mb-[2rem] text-base font-bold">
                            Track your workouts, monitor your progress, and stay
                            motivated with our easy-to-use health and fitness
                            app.
                        </p>
                        <div className="flex flex-row gap-3">
                            <Button
                                size={ComponentSize.MEDIUM}
                                label="Get Fit Now"
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleSignUp}
                                className="max-w-[13rem]"
                            />
                            <a href="#how-it-works">
                                <Button
                                    size={ComponentSize.MEDIUM}
                                    label="Learn more"
                                    variant={ButtonVariant.SECONDARY}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute right-0 top-0 z-[-1] -translate-y-1/2 translate-x-1/2">
                            <Fade
                                className="bg-buttonPrimary size-[11.625rem] rounded-full"
                                x={75}
                            />
                        </div>
                        {theme === Theme.DARK ? (
                            <img
                                src={OverviewDarkImage}
                                alt="overviewDark"
                                className="w-[22rem] md:w-[30rem]"
                            />
                        ) : (
                            <img
                                src={OverviewLightImage}
                                alt="overviewLight"
                                className="w-[22rem] md:w-[30rem]"
                            />
                        )}
                        <div className="absolute bottom-0 left-0 z-[-1] -translate-x-1/2 translate-y-1/2">
                            <Fade
                                className="bg-buttonPrimary size-[18.5rem] rounded-full"
                                x={-75}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="features"
                className={getValidClassNames(
                    styles.section,
                    styles.container,
                    'flex justify-center',
                )}
            >
                <h1 className="font-heavybold text-center text-[2.5rem] md:text-[3.5rem]">
                    Features Tailored for Your Success
                </h1>
                <p className="text-lm-grey-100 mx-auto mb-[3rem] max-w-[53rem] text-center">
                    Explore our range of features designed to support you every
                    step of the way. From personalized workout plans to
                    nutrition tracking, we’ve got you covered!
                </p>
                <div
                    className={getValidClassNames(
                        'relative flex flex-row justify-center gap-12 xl:justify-start',

                        styles.secondSection.gradient,
                    )}
                >
                    <motion.div
                        className="flex max-w-[35.25rem] flex-1 flex-col gap-4 md:gap-8"
                        variants={{
                            visible: {
                                transition: {
                                    delayChildren: 0.2,
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                        initial="hidden"
                        whileInView="visible"
                    >
                        {FEATURES.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                            >
                                <FeatureCard
                                    iconName={
                                        feature.iconName as ValueOf<
                                            typeof IconName
                                        >
                                    }
                                    title={feature.title}
                                    description={feature.description}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="relative z-[-1] hidden items-center justify-center xl:flex">
                        <Fade
                            className="bg-buttonPrimary relative rounded-full xl:size-[31.25rem]"
                            x={100}
                        >
                            <FeatureBg className="absolute -translate-x-20 -translate-y-72 grayscale" />
                        </Fade>
                        <Zoom className="absolute z-[-1] size-[46rem] rounded-full border-[1px] border-[#A1A2A180] bg-transparent outline outline-1 outline-offset-[10rem] outline-[#A1A2A180]" />
                    </div>
                </div>
            </section>
            <section
                id="how-it-works"
                className={getValidClassNames(
                    styles.section,
                    styles.container,
                    'items-center justify-center gap-16',
                )}
            >
                <div>
                    <h1 className="font-heavybold mb-[0.5rem] text-center text-[3.5rem] leading-[4rem]">
                        How It Works
                    </h1>
                    <p className="text-lm-grey-100 max-w-[40rem] text-center leading-4">
                        Lime tailors your fitness journey with personalized
                        workouts, nutrition plans, and progress tracking. Ready
                        to experience it?
                    </p>
                </div>
                <div className="flex w-full min-w-[40rem] flex-col items-center justify-between gap-y-12 lg:flex-row">
                    <Fade x={-30}>
                        {theme === Theme.DARK ? (
                            <img
                                src={SignInDark}
                                alt="signInDark"
                                className="w-[22rem] md:w-[35.375rem]"
                            />
                        ) : (
                            <img
                                src={SignInLight}
                                alt="signInLight"
                                className="w-[22rem] md:w-[35.375rem]"
                            />
                        )}
                    </Fade>
                    <div className="flex h-full w-full flex-1 flex-col gap-16">
                        <IntroCard
                            number="02"
                            title="Tell Us About Yourself"
                            description="Help us personalize your experience. Share your fitness goals and current fitness level through a quick and easy questionnaire."
                        />
                        <IntroCard
                            number="03"
                            title="Discover the Benefits"
                            description="Explore the unique features of Lime. Learn about personalized workouts, nutrition guidance, and progress tracking tailored to your needs."
                        />
                        <IntroCard
                            number="04"
                            title="Interactive Walkthrough"
                            description="Navigate the app with ease. Our interactive tour guides you through key features and functionalities."
                        />
                    </div>
                </div>
                <Button
                    size={ComponentSize.MEDIUM}
                    label="Start Your Journey Now"
                    variant={ButtonVariant.PRIMARY}
                    className="max-w-[15rem]"
                    onClick={handleSignUp}
                />
            </section>
            <section
                id="testimonials"
                className={getValidClassNames(styles.section, 'justify-center')}
            >
                <div className="mx-auto mb-[3rem] flex flex-col items-center">
                    <div className="bg-secondary mb-[0.375rem] inline-block rounded-[6.25rem] px-6 py-3">
                        <p className="text-base font-bold leading-4 after:content-['\1F60D']">
                            They already love our products
                        </p>
                    </div>
                    <h1 className="font-heavybold mb-[0.5rem] text-center text-[2.5rem] leading-[4rem] md:text-[3.5rem]">
                        See what our users say about us
                    </h1>
                </div>
                <div className="flex flex-col gap-4">
                    <Fade x={-200}>
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-nowrap">
                            {TESTIMONIALS.slice(0, 3).map(
                                (testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        rating={5}
                                        text={testimonial.text}
                                        name={testimonial.name}
                                        occupation={testimonial.head}
                                        avatarImage={testimonial.avatar}
                                        avatarBgColor={testimonial.bgColor}
                                    />
                                ),
                            )}
                        </div>
                    </Fade>
                    <Fade x={200}>
                        <div className="hidden flex-nowrap justify-center gap-4 md:flex">
                            {TESTIMONIALS.slice(3, 7).map(
                                (testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        rating={5}
                                        text={testimonial.text}
                                        name={testimonial.name}
                                        occupation={testimonial.head}
                                        avatarImage={testimonial.avatar}
                                        avatarBgColor={testimonial.bgColor}
                                    />
                                ),
                            )}
                        </div>
                    </Fade>
                    <Fade x={-200}>
                        <div className="hidden flex-nowrap justify-center gap-4 md:flex">
                            {TESTIMONIALS.slice(7, 10).map(
                                (testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        rating={5}
                                        text={testimonial.text}
                                        name={testimonial.name}
                                        occupation={testimonial.head}
                                        avatarImage={testimonial.avatar}
                                        avatarBgColor={testimonial.bgColor}
                                    />
                                ),
                            )}
                        </div>
                    </Fade>
                </div>
            </section>
            <section className={getValidClassNames(styles.section)}>
                <div className="bg-secondary flex flex-1 flex-col items-center justify-center p-4">
                    <div className="max-w-[37.5rem] text-center leading-4">
                        <h1 className="font-heavybold mb-[1rem] text-center text-[2.5rem] leading-[4rem] md:text-[3.5rem]">
                            Ready to Ignite Your Fitness Journey?
                        </h1>
                        <p className="mb-[2.25rem] font-bold">
                            Don’t just take our word for it, experience the
                            transformation yourself! Download FitLife now and
                            step into a world of personalized fitness and
                            health. Your journey to a healthier, fitter you
                            starts here.
                        </p>
                    </div>
                    <Button
                        size={ComponentSize.MEDIUM}
                        label="Get Fit Now"
                        variant={ButtonVariant.PRIMARY}
                        className="max-w-[15rem]"
                        onClick={handleSignUp}
                    />
                </div>
                <footer className="container mx-auto flex h-[40rem] flex-col-reverse items-center justify-evenly sm:h-[20rem] md:flex-row md:items-start md:pt-60">
                    <div>
                        {theme === Theme.DARK ? (
                            <Icon
                                name="logoHeader"
                                color={IconColor.PRIMARY}
                                size={ComponentSize.EXTRA_LARGE}
                                className="aspect-video max-h-12"
                            />
                        ) : (
                            <Icon
                                name="logoHeaderLight"
                                color={IconColor.PRIMARY}
                                size={ComponentSize.EXTRA_LARGE}
                                className="aspect-video max-h-12"
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div>
                            <h5 className="mb-4 font-semibold uppercase">
                                Company
                            </h5>
                            <ul className="flex flex-col gap-2 text-sm font-normal leading-4 opacity-60">
                                <Link to={AppRoute.ROOT}>Home</Link>
                                <a href="#features">Features</a>
                                <a href="#how-it-works">How it works</a>
                                <a href="#testimonials">Testimonials</a>
                                <Link to={AppRoute.SIGN_UP}>Sign Up</Link>
                            </ul>
                        </div>
                        <div>
                            <h5 className="mb-4 font-semibold uppercase">
                                Resources
                            </h5>
                            <ul className="flex flex-col gap-2 text-sm font-normal leading-4 opacity-60">
                                <li>
                                    <u>Powered</u> by <b>Strava</b>
                                </li>
                                <li>
                                    <u>Powered</u> by <b>Google fit</b>
                                </li>
                                <li>
                                    <u>Powered</u> by <b>AI</b>
                                </li>
                                <Link to={AppRoute.ROOT}>
                                    See all resources
                                </Link>
                            </ul>
                        </div>
                        <div>
                            <h5 className="mb-4 font-semibold uppercase">
                                About
                            </h5>
                            <ul className="flex flex-col gap-2 text-sm font-normal leading-4 opacity-60">
                                <Link to={AppRoute.ROOT}>
                                    Terms & Conditions
                                </Link>
                                <Link to={AppRoute.ROOT}>Privacy Policy</Link>
                            </ul>
                        </div>
                    </div>
                </footer>
            </section>
        </main>
    );
};

export { Landing };
