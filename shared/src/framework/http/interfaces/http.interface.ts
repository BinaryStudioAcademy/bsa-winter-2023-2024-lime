import { type HttpOptions } from '../types/http-options.type';

interface IHttp {
    load(path: string, options: HttpOptions): Promise<Response>;
}

export { type IHttp };
