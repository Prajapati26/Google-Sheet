# Google Sheets Clone

A Google Sheets clone built with React, TypeScript, and modern web technologies.

## Tech Stack & Data Structures

### Core Technologies  
- **React**: Frontend framework for building the user interface
- **TypeScript**: Static typing for better development experience and code quality
- **Zustand**: State management for handling the spreadsheet data
- **Immer**: Immutable state updates for predictable state management
- **Tailwind CSS**: Utility-first CSS framework for styling

### Data Structures

#### Sheet State
The application uses a flat object structure for cell data storage:

```typescript
interface SheetState {
  data: { [key: string]: CellData };  // Cell data indexed by cell ID (e.g., "A1")
  selectedCell: string | null;         // Currently selected cell
  selectedRange: string[] | null;      // Selected range of cells
  columnWidths: { [key: string]: number }; // Column width customizations
  rowHeights: { [key: number]: number };   // Row height customizations
  numRows: number;                     // Total number of rows
  numCols: number;                     // Total number of columns
}
```

This structure was chosen because:
1. O(1) access time for cell data
2. Efficient updates for individual cells
3. Easy serialization for save/load functionality
4. Memory efficient for sparse data (empty cells don't consume memory)

#### Cell Data
Each cell contains:
```typescript
interface CellData {
  value: string;    // Displayed value
  formula: string;  // Formula or raw input
  style: CellStyle; // Cell formatting
}
```

### Formula Evaluation
The formula engine uses a recursive evaluation strategy:
1. Parses formula strings using regex
2. Recursively evaluates cell references
3. Supports basic mathematical and data quality functions

### Features

1. Spreadsheet Interface
   - Google Sheets-like UI
   - Cell selection and editing
   - Formula bar
   - Styling toolbar

2. Mathematical Functions
   - SUM
   - AVERAGE
   - MAX
   - MIN
   - COUNT

3. Data Quality Functions
   - TRIM
   - UPPER
   - LOWER
   - REMOVE_DUPLICATES 
   - FIND_AND_REPLACE

4. Cell Formatting
   - Bold
   - Italic
   - Font size
   - Text color

### Future Improvements

1. Implement cell drag functionality
2. Add support for complex formulas
3. Add data visualization capabilities
4. Implement save/load functionality
5. Add undo/redo support
6. Implement collaborative editing

# Clone the Repository:  
 
    git clone https://github.com/Prajapati26/Chatbot.git

# Navigate to the Project Directory  
 
    cd Chatbot

# Install Dependencies  
 
    npm install
    
# if npm audit fix error Occour 

    npm audit fix

# Running the Application

    npm run dev

    


 
