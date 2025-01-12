import { create } from 'zustand';
import { produce } from 'immer';
import { SheetState, CellData } from '../types/sheet';

const DEFAULT_ROWS = 100;
const DEFAULT_COLS = 26;

const initialState: SheetState = {
  data: {},
  selectedCell: null,
  selectedRange: null,
  columnWidths: {},
  rowHeights: {},
  numRows: DEFAULT_ROWS,
  numCols: DEFAULT_COLS,
};

export const useSheetStore = create<{
  state: SheetState;
  updateCell: (cellId: string, updates: Partial<CellData>) => void;
  setSelectedCell: (cellId: string | null) => void;
  setSelectedRange: (range: string[] | null) => void;
  updateColumnWidth: (col: string, width: number) => void;
  updateRowHeight: (row: number, height: number) => void;
}>((set) => ({
  state: initialState,
  
  updateCell: (cellId, updates) =>
    set(
      produce((state) => {
        if (!state.state.data[cellId]) {
          state.state.data[cellId] = {
            value: '',
            formula: '',
            style: { bold: false, italic: false, fontSize: 12, color: '#000000' },
          };
        }
        Object.assign(state.state.data[cellId], updates);
      })
    ),

  setSelectedCell: (cellId) =>
    set(
      produce((state) => {
        state.state.selectedCell = cellId;
        state.state.selectedRange = null;
      })
    ),

  setSelectedRange: (range) =>
    set(
      produce((state) => {
        state.state.selectedRange = range;
      })
    ),

  updateColumnWidth: (col, width) =>
    set(
      produce((state) => {
        state.state.columnWidths[col] = width;
      })
    ),

  updateRowHeight: (row, height) =>
    set(
      produce((state) => {
        state.state.rowHeights[row] = height;
      })
    ),
}));