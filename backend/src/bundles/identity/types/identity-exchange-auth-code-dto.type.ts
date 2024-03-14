type IdentityExchangeAuthCodeDto = {
    code: string;
    scope: string;
    state: string;
    referralCode: string | null;
};

export { type IdentityExchangeAuthCodeDto };
