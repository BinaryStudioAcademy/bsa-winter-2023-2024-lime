const CircularProgressEnum = {
    SIZE: {
        SMALL: 'small',
        MEDIUM: 'medium',
        LARGE: 'large',
    },
    COLOR: {
        PRIMARY: 'primary',
        SECONDARY: 'secondary',
        DEFAULT: 'default',
    },
    STROKE: {
        SMALL: 5,
        MEDIUM: 8,
        LARGE: 10,
    },
} as const;

const CircularSizes = {
    [CircularProgressEnum.SIZE.SMALL]: { radius: 48, stroke: 5 },
    [CircularProgressEnum.SIZE.MEDIUM]: { radius: 80, stroke: 15 },
    [CircularProgressEnum.SIZE.LARGE]: { radius: 120, stroke: 20 },
} as const;

const CircularColors = {
    [CircularProgressEnum.COLOR.PRIMARY]: {
        baseCircleClass: 'stroke-lm-black-100',
        progressCircleClass: 'stroke-lm-yellow-100',
    },
    [CircularProgressEnum.COLOR.SECONDARY]: {
        baseCircleClass: 'stroke-lm-black-200',
        progressCircleClass: 'stroke-lm-yellow-200',
    },
    [CircularProgressEnum.COLOR.DEFAULT]: {
        baseCircleClass: 'stroke-lm-black-300',
        progressCircleClass: 'stroke-lm-yellow-100',
    },
} as const;

const CircularStroke = {
    [CircularProgressEnum.SIZE.SMALL]: 5,
    [CircularProgressEnum.SIZE.MEDIUM]: 8,
    [CircularProgressEnum.SIZE.LARGE]: 10,
} as const;

export { CircularColors, CircularSizes, CircularStroke };
