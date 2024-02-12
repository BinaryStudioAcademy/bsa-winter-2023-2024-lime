import { type ContentType } from '~/bundles/common/enums/enums.js';
import { type HttpOptions } from '~/framework/http/http.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    hasAuth: boolean;
    contentType: typeof ContentType;
    payload?: HttpOptions['payload'];
};

export { type HttpApiOptions };
