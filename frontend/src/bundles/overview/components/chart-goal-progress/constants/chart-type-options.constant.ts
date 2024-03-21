import { getSelectOptions } from '~/bundles/common/helpers/helpers.js';

import { ChartType } from '../enums/enums.js';

const CHART_TYPE_OPTIONS = getSelectOptions(ChartType);

export { CHART_TYPE_OPTIONS };
