import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCellId(row: number, col: number): string {
  const colLetter = String.fromCharCode(65 + col);
  return `${colLetter}${row + 1}`;
}

export function parseCellId(cellId: string): { row: number; col: number } {
  const colLetter = cellId.match(/[A-Z]+/)?.[0] || 'A';
  const row = parseInt(cellId.match(/\d+/)?.[0] || '1') - 1;
  const col = colLetter.charCodeAt(0) - 65;
  return { row, col };
}

export function evaluateFormula(formula: string, getData: (cellId: string) => number): number {
  if (!formula.startsWith('=')) return parseFloat(formula) || 0;

  const functionMatch = formula.match(/^=(\w+)\((.*)\)$/);
  if (!functionMatch) return 0;

  const [_, functionName, args] = functionMatch;
  const range = args.split(':').map(cell => cell.trim());

  const getCellRange = (start: string, end: string): string[] => {
    const startPos = parseCellId(start);
    const endPos = parseCellId(end);
    const cells: string[] = [];

    for (let row = startPos.row; row <= endPos.row; row++) {
      for (let col = startPos.col; col <= endPos.col; col++) {
        cells.push(getCellId(row, col));
      }
    }

    return cells;
  };

  const values = range.length === 2 
    ? getCellRange(range[0], range[1]).map(getData)
    : range[0].split(',').map(cell => getData(cell.trim()));

  switch (functionName.toUpperCase()) {
    case 'SUM':
      return values.reduce((sum, val) => sum + val, 0);
    case 'AVERAGE':
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    case 'MAX':
      return Math.max(...values);
    case 'MIN':
      return Math.min(...values);
    case 'COUNT':
      return values.filter(val => !isNaN(val)).length;
    default:
      return 0;
  }
}