export default class TurnsCount {
    private static _turns: number = 0;

    public static get turns(): number {
        return this._turns;
    }

    public static set turns(__turns: number) {
        this._turns = __turns;
    } 

    public static increase(): void {
        this._turns += 1;
    }
}