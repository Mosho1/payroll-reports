import { Service } from "typedi";

@Service()
export class CsvParser {
    fromString<T extends { [index: string]: string }>(csvString: string): { id: string, entries: T[] } {
        const rows = csvString.trim().split('\n').map(row => row.split(','));
        const header = rows.splice(0, 1)[0];
        const footer = rows.splice(rows.length - 1, 1)[0];

        if (!footer) throw new Error('csv log must have a footer!')

        const entries = rows.map(row => header.reduce((entry, col, i) => {
            entry[col] = row[i];
            return entry;
        }, {} as T));

        const id = footer[1];

        return {id, entries};
    }
}