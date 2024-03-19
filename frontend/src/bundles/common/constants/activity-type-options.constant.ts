import { ActivityType } from '../enums/enums.js';
import { getSelectOptions } from '../helpers/helpers.js';

const ACTIVITY_TYPE_OPTIONS = getSelectOptions(ActivityType);

export { ACTIVITY_TYPE_OPTIONS };
