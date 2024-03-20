import { type ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type ActivityIconSize = Exclude<
    ValueOf<typeof ComponentSize>,
    typeof ComponentSize.EXTRA_LARGE | typeof ComponentSize.HUGE
>;

export { type ActivityIconSize };
