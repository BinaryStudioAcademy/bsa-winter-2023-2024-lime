import { Storage } from './storage.package.js';

const storage = new Storage(window.localStorage);

export { storage };
export { StorageKey } from './enums/enums.js';
export { type IStorage } from './interfaces/interfaces.js';
