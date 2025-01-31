import React, {useState} from 'react';
import { styles } from '../styles/styles';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { randomCell } from '../utils/empty-init';
import Cat from '../components/cat'

class Cell {
  row: number;
  cell: number;
  center: number;
  isEmpty: boolean;
  absoluteX: number;
  absoluteY: number;

  constructor(row: number, cell: number, isEmpty: boolean, cellSize: number) {
    this.row = row;
    this.cell = cell;
    this.isEmpty = isEmpty;
    const totalRowWidth = (row + 1) * cellSize;
    const rowOffset = totalRowWidth / 2;
    this.absoluteX = (cell * cellSize) - rowOffset;
    this.absoluteY = row * cellSize;
  }

  getCenter(cellSize: number) {
    return {
      x: this.absoluteX + cellSize / 2,
      y: this.absoluteY + cellSize /2
    };
  }

}

class Board {
  cells: Cell[][];

  constructor(rows: number, cellSize: number) {
    this.cells = [];
    this.initializeCells(rows, cellSize);
  }

  addCat(cat: Cat) {
    const { row, cell } = cat.location;
    if (this.cells[row] && this.cells[row][cell]) {
      this.cells[row][cell].isEmpty = false;
    }
  }
  createCats() {
    let id = 1;
    const cats: Cat[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.cells[i][j].isEmpty) {
          const cat = new Cat(this.cells[i][j], [], id);
          cats.push(cat);
          this.addCat(cat);
          id += 1;
        }
      }
    }
    return cats;
  }
  private initializeCells(rows: number, cellSize: number) {
    let emptyCells: Cell[] = [];
    let randCell = randomCell(rows);
    emptyCells.push(randCell);
    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < i + 1; j++) {
        if (randCell.row === i && randCell.cell === j) {
          row.push(new Cell(i, j, true, cellSize));
        } else {
          row.push(new Cell(i, j, false, cellSize));
        }
      }
      this.cells.push(row);
    }
  }
}
export default Board;
