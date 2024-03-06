import { type Http, type HttpOptions } from './types/types.js';

class BaseHttp implements Http {
    public async load(path: string, options: HttpOptions): Promise<Response> {
        const { headers, method, payload } = options;

        const response = await fetch(path, {
            body: payload,
            headers,
            method,
        });

        if (response.redirected) {
            window.location.href = response.url;
        }

        return response;
    }
}

export { BaseHttp };
