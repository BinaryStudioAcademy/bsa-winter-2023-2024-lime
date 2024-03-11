import { type store } from '../store.js';

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
