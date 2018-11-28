import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { PayrollLog } from "./entity/PayrollLog";
import { PayrollEntry } from "./entity/PayrollEntry";
import { PayrollGroup } from "./entity/PayrollGroup";
import { seedDatabase } from "./helpers";
import { RedisClient } from "redis";
import { getSchema } from './schema/schema';
import { promisify } from 'util';
import * as minimist from 'minimist';

const defaultArgs = {
    resetDB: false
};

const args = minimist<typeof defaultArgs>(process.argv.slice(2), {
    default: defaultArgs
});

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            type: "postgres",
            database: "postgres",
            username: "postgres", // fill this with your username
            password: "password", // and password
            port: 5432,
            host: process.env.POSTGRES_HOST || 'localhost',
            entities: [PayrollLog, PayrollEntry, PayrollGroup],
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
            dropSchema: args.resetDB,
            cache: true,
        });

        const redis = new RedisClient({
            host: process.env.REDIS_HOST || 'localhost'
        });

        if (args.resetDB) {
            await promisify(redis.flushall.bind(redis))();
        }

        Container.set(RedisClient, redis);

        // seed database with some data
        await seedDatabase();

        const schema = await getSchema();

        // create mocked context
        // Create GraphQL server
        const server = new ApolloServer({ schema });

        // Start the server
        const { url } = await server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (err) {
        console.error(err);
    }
}

bootstrap();