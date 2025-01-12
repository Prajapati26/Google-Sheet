import React from 'react';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-2 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Google Sheets</h1>
      </div>
      <Toolbar />
      <FormulaBar />
      <Grid />
    </div>
  );
}

export default App;