export function findTarget(x: number, y: number, cellSize: number) {

  const targetRow = Math.floor(y / cellSize);

  const totalRowWidth = (targetRow + 1) * cellSize;
  const rowOffset = totalRowWidth / 2;
  const adjustedX = x + rowOffset - (cellSize / 2);

  const targetCell = Math.floor(adjustedX / cellSize);

  const maxCellsInRow = targetRow + 1;
  const boundedTargetCell = Math.min(targetCell, maxCellsInRow - 1);

  return [targetRow, Math.max(0, boundedTargetCell)] as [number, number];
}
