import { styles } from '../styles/styles';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { randomCell } from '../utils/empty-init';

class Cell {
  row: number;
  cell: number;
  isEmpty: boolean;

  constructor(row: number, cell: number, isEmpty: boolean) {
    this.row = row;
    this.cell = cell;
    this.isEmpty = isEmpty;
  }
}

class Board {
  cells: Cell[][];

  constructor(rows: number) {
    this.cells = [];
    this.initializeCells(rows);
  }

  private initializeCells(rows: number) {
    let emptyCells: Cell[] = [];
    let randCell = randomCell(rows);
    emptyCells.push(randCell);
    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < i + 1; j++) {
        if (randCell.row === i && randCell.cell === j) {
          row.push(new Cell(i, j, true));
        } else {
          row.push(new Cell(i, j, false));
        }
      }
      this.cells.push(row);
    }
  }
}
export default Board;
