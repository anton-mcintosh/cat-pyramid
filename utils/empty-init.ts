
export const randomCell = (rows: number) => {
    const row = Math.floor(Math.random() * rows);
    const cell = Math.floor(Math.random() * (row + 1));
    return { row, cell };
  }
