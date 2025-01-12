import React, { useCallback } from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { getCellId, parseCellId, evaluateFormula } from '../lib/utils';

export function Grid() {
  const { state, updateCell, setSelectedCell } = useSheetStore();

  const getCellValue = useCallback(
    (cellId: string): number => {
      const cell = state.data[cellId];
      if (!cell?.value) return 0;
      if (cell.formula.startsWith('=')) {
        return evaluateFormula(cell.formula, getCellValue);
      }
      return parseFloat(cell.value) || 0;
    },
    [state.data]
  );

  const renderCell = (row: number, col: number) => {
    const cellId = getCellId(row, col);
    const cellData = state.data[cellId];
    const isSelected = state.selectedCell === cellId;

    return (
      <td
        key={cellId}
        className={`border min-w-[100px] relative ${
          isSelected ? 'outline outline-2 outline-blue-500' : ''
        }`}
        onClick={() => setSelectedCell(cellId)}
      >
        <div
          className="px-2 py-1 w-full h-full"
          style={{
            fontWeight: cellData?.style.bold ? 'bold' : 'normal',
            fontStyle: cellData?.style.italic ? 'italic' : 'normal',
            fontSize: `${cellData?.style.fontSize || 12}px`,
            color: cellData?.style.color || '#000000',
          }}
        >
          {cellData?.formula.startsWith('=')
            ? getCellValue(cellId)
            : cellData?.value || ''}
        </div>
      </td>
    );
  };

  return (
    <div className="overflow-auto flex-1">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border bg-gray-100 w-10">#</th>
            {Array.from({ length: state.numCols }).map((_, col) => (
              <th key={col} className="border bg-gray-100 px-2 py-1">
                {String.fromCharCode(65 + col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: state.numRows }).map((_, row) => (
            <tr key={row}>
              <td className="border bg-gray-100 text-center">{row + 1}</td>
              {Array.from({ length: state.numCols }).map((_, col) =>
                renderCell(row, col)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}