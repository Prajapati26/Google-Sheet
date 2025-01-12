import React from 'react';
import { Bold, Italic, Type, Palette } from 'lucide-react';
import { useSheetStore } from '../store/useSheetStore';

export function Toolbar() {
  const { state, updateCell } = useSheetStore();
  const selectedCell = state.selectedCell;
  const cellData = selectedCell ? state.data[selectedCell] : null;

  const toggleStyle = (style: 'bold' | 'italic') => {
    if (!selectedCell || !cellData) return;
    updateCell(selectedCell, {
      style: { ...cellData.style, [style]: !cellData.style[style] },
    });
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <button
        onClick={() => toggleStyle('bold')}
        className={`p-1 rounded hover:bg-gray-100 ${
          cellData?.style.bold ? 'bg-gray-200' : ''
        }`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => toggleStyle('italic')}
        className={`p-1 rounded hover:bg-gray-100 ${
          cellData?.style.italic ? 'bg-gray-200' : ''
        }`}
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <div className="flex items-center gap-2">
        <Type size={18} />
        <input
          type="number"
          value={cellData?.style.fontSize || 12}
          onChange={(e) => {
            if (selectedCell && cellData) {
              updateCell(selectedCell, {
                style: { ...cellData.style, fontSize: parseInt(e.target.value) },
              });
            }
          }}
          className="w-16 px-2 py-1 border rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <Palette size={18} />
        <input
          type="color"
          value={cellData?.style.color || '#000000'}
          onChange={(e) => {
            if (selectedCell && cellData) {
              updateCell(selectedCell, {
                style: { ...cellData.style, color: e.target.value },
              });
            }
          }}
          className="w-8 h-8 p-0 border rounded"
        />
      </div>
    </div>
  );
}