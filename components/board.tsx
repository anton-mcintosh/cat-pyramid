import React, {useState} from 'react';
import { styles } from '../styles/styles';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { randomCell } from '../utils/empty-init';
import Cat from '../components/cat'

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

  addCat(cat: Cat) {
    const { row, cell } = cat.location;
    if (this.cells[row] && this.cells[row][cell]) {
      this.cells[row][cell].isEmpty = false;
    }
  }
  createCats() {
    const cats: Cat[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.cells[i][j].isEmpty) {
          const cat = new Cat(this.cells[i][j], []);
          cats.push(cat);
          this.addCat(cat);
        }
      }
    }
    return cats;
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
