import React from 'react';
import { useSheetStore } from '../store/useSheetStore';

export function FormulaBar() {
  const { state, updateCell } = useSheetStore();
  const selectedCell = state.selectedCell;
  const cellData = selectedCell ? state.data[selectedCell] : null;

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="font-mono bg-gray-100 px-2 py-1 rounded">
        {selectedCell || ''}
      </div>
      <input
        type="text"
        value={cellData?.formula || ''}
        onChange={(e) => {
          if (selectedCell) {
            updateCell(selectedCell, {
              formula: e.target.value,
              value: e.target.value,
            });
          }
        }}
        placeholder="Enter formula or value"
        className="flex-1 px-2 py-1 border rounded"
      />
    </div>
  );
}