import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  dimension = 5;
  winLength = 4;
  numberOfPlayers = 3;
  minDimension = 3;
  maxDimension = 15;
  board: string[][] = [];
  symbols = ['X', 'O', '△', '▢'];
  players = this.symbols.slice(0, this.numberOfPlayers);
  currentPlayerIndex = 0;
  winner: string | null = null;
  moves = 0;
  winningCells: [number, number][] = [];
  lastMove: [number, number] | null = null;

  ngOnInit(): void {
    this.resetGame();
  }

  get isInvalid(): boolean {
    return (
      this.dimension < this.minDimension ||
      this.dimension > this.maxDimension ||
      this.winLength < this.minDimension ||
      this.winLength > this.dimension
    );
  }

  initializeBoard(): void {
    this.board = Array.from({ length: this.dimension }, () => Array(this.dimension).fill(''));
  }

  makeMove(row: number, col: number): void {
    if (!this.board[row][col] && !this.winner) {
      const player = this.players[this.currentPlayerIndex];
      this.board[row][col] = player;
      this.moves++;
      this.lastMove = [row, col];

      if (this.checkWinner(row, col, player)) {
        this.winner = player;
      } else if (this.moves === this.dimension * this.dimension) {
        this.winner = 'Draw';
      } else {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
    }
  }

  checkWinner(row: number, col: number, player: string): boolean {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let [dx, dy] of directions) {
      let cells: [number, number][] = [[row, col]];

      for (let i = 1; i < this.winLength; i++) {
        const rIndex = row + i * dx;
        const cIndex = col + i * dy;
        if (rIndex < 0 || rIndex >= this.dimension || cIndex < 0 || cIndex >= this.dimension || this.board[rIndex][cIndex] !== player)
          break;
        cells.push([rIndex, cIndex]);
      }

      for (let i = 1; i < this.winLength; i++) {
        const rIndex = row - i * dx;
        const cIndex = col - i * dy;
        if (rIndex < 0 || rIndex >= this.dimension || cIndex < 0 || cIndex >= this.dimension || this.board[rIndex][cIndex] !== player)
          break;
        cells.unshift([rIndex, cIndex]);
      }

      if (cells.length >= this.winLength) {
        this.winningCells = cells;
        return true;
      }
    }

    return false;
  }

  isWinningCell(row: number, col: number): boolean {
    return this.winningCells.some(([r, c]) => r === row && c === col);
  }

  updatePlayerCount(count: number): void {
    this.players = this.symbols.slice(0, count);
    this.resetGame();
  }

  resetGame(): void {
    this.initializeBoard();
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.moves = 0;
    this.winningCells = [];
  }
}
