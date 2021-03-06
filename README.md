# React Spreadsheet

React Excel like data grid component.

## Demo and Documentation
Live examples available [here](https://vadim-sartakov.github.io/react-spreadsheet/storybook/).

Documentation available [here](https://vadim-sartakov.github.io/react-spreadsheet/docs/).

## Features
- Rows/columns resizing;
- Fixed rows and columns;
- Merged cells;
- Custom cells;
- Virtualized;

## Styling
To get basic styling default styles could be imported:
```javascript
import '@vadim-sartakov/react-spreadsheet/styles.css';
```

Custom styling is also available. By default spreadsheet has the following style classes:

Class|Description
---|---
spreadsheet|Root class
cell|General cell
heading-cell|Heading cell. Row numbers, column numbers
value-cell|Value cell