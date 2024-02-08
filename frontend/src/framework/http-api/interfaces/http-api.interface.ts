import { type HttpApiOptions } from '../types/http-api-options.type.js';

interface IHttpApi {
    load(path: string, options: HttpApiOptions): Promise<Response>;
}

export { type IHttpApi };
