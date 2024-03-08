import { AppRoute } from '~/bundles/common/enums/enums.js';

const constructReferralUrl = (userReferralCode: string): string => {
    return `${window.origin}${AppRoute.SIGN_UP}?referralCode=${userReferralCode}`;
};

export { constructReferralUrl };
