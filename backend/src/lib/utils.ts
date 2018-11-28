import { promisify } from 'util';

export const promisifyMethod = <U, T, K extends keyof T>(object: T, methodName: K) => {
    const method = object[methodName];
    if (typeof method !== 'function') throw new Error(`Key ${method} is not a method`)
    return promisify<U>(method.bind(object));
};