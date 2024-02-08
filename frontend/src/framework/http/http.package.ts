import { type IHttp } from './interfaces/interfaces.js';
import { type HttpOptions } from './types/types.js';

class Http implements IHttp {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { headers, method, payload } = options;

        return fetch(path, {
            body: payload,
            headers,
            method,
        });
    }
}

export { Http };
