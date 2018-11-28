import { CsvParser } from "../../lib/CsvParser";
import {promises as fs} from 'fs';
import { join } from "path";
import Container from "typedi";

describe('PayrollData', () => {
    it('parses a csv string', async () => {
        const csvParser = Container.get(CsvParser);
        const csv = await fs.readFile(join(__dirname, 'sample.csv'));
        const report = csvParser.fromString(csv.toString());
        expect(report).toMatchSnapshot();
    });
});