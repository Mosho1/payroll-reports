import "reflect-metadata";
import { printSchema } from "graphql";
import { getSchema } from './schema';

(async () => {
    const schema = await getSchema();
    console.log(printSchema(schema));
})();