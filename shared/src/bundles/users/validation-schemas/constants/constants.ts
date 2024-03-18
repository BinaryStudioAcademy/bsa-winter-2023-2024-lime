const UnicodePattern = {
    EMAIL_PATTERN: /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/,
    FULLNAME_PATTERN: /^[\p{L}\p{M}\p{S}\p{Z}\p{N}\p{P}]+$/u,
    NICKNAME_PATTERN: /^[\p{L}\p{M}\p{S}\p{Z}\p{N}\p{P}]+$/u,
    BIRTHDATE_PATTERN: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    LOCATION_PATTERN:
        /^([\p{L}\p{M}\p{S}\p{Z}\p{N}\p{P}]+),\s*([\p{L}\p{M}\p{S}\p{Z}\p{N}\p{P}]+)$/u,
} as const;

export { UnicodePattern };
