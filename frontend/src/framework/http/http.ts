import { Http } from './http.package.js';

const http = new Http();

export { http };
export { HttpCode, HttpHeader } from './enums/enums.js';
export { HttpError } from './exceptions/exceptions.js';
export { type IHttp } from './interfaces/interfaces.js';
export { type HttpOptions } from './types/types.js';
