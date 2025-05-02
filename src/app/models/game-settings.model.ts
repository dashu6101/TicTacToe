export class GameSettings {
    constructor(
        public dimension: number = 5,
        public winLength: number = 4,
        public numberOfPlayers: number = 3
    ) { }

    get isInvalid(): boolean {
        return (
            this.isInvalidDimension || this.isInvalidWinLength
        );
    }

    get isInvalidDimension(): boolean {
        return (
            this.dimension < 3 || this.dimension > 15
        );
    }

    get isInvalidWinLength(): boolean {
        return (
            this.winLength < 3 || this.winLength > this.dimension
        );
    }
}
