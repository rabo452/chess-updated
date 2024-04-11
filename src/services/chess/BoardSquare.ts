export default class BoardSquare {
    public readonly row: number;
    public readonly column: number;

    constructor(row: number, column: number) {
        if (row > 7 || row < 0 || column > 7 || column < 0) {
            throw new Error(`such the square with coordinates row: ${row} column: ${column} doesn't exist!`);
        }
        this.row = row;
        this.column = column;
    }
}