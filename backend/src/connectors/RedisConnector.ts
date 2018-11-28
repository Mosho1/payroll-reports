import 'redis';
import { ClientOpts, createClient, RedisClient } from 'redis';
import { Service, Inject } from 'typedi';
import { promisifyMethod } from '../lib/utils';

interface AsyncRedisClient {
    get(key: string): Promise<string>,
    set(key: string, value: string): Promise<string>,
    del(key: string): Promise<boolean>,
    scan(...args: string[]): Promise<[string, string[]]>,
}

@Service()
export class RedisConnector {
    constructor(
        private readonly redisClient: RedisClient
    ) { }

    private client: AsyncRedisClient = {
        set: promisifyMethod(this.redisClient, 'set'),
        get: promisifyMethod(this.redisClient, 'get'),
        del: promisifyMethod(this.redisClient, 'del'),
        scan: promisifyMethod(this.redisClient, 'scan'),
    };

    async get(key: string): Promise<string | null> {
        const value = await this.client.get(key);
        return value === 'null' ? null : value;
    }

    private async scan(cursor = '0', pattern = '*', returnSet = new Set()): Promise<string[]> {
        const response = await this.client.scan(cursor, 'MATCH', pattern);
        cursor = response[0];
        const keys = response[1];   

        for (const k of keys) {
            returnSet.add(k);
        }

        if (cursor === '0') return Array.from(returnSet);

        return this.scan(cursor, pattern, returnSet);
    }

    async getAll(pattern = '*') {
        const keys = await this.scan('0', pattern);
        let map: { [index: string]: string } = {};
        const keysAndValues = await Promise.all(keys.map(async (key) => {
            const value = await this.get(key);
            if (value) map[key] = value;
        }));
        return map;
    }

    set(key: string, value: string | object) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        return this.client.set(key, value);
    }

    del(key: string) {
        return this.client.del(key)
    }
}