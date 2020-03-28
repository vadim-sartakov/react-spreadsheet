import React from 'react';
import { storiesOf } from '@storybook/react';
import Spreadsheet from './Spreadsheet';
import './style.css';

const generateMeta = count => {
  return [...new Array(count).keys()];
};

const generateCells = (rowsCount, columnsCount) => {
  return generateMeta(rowsCount).map(row => {
    return generateMeta(columnsCount).map(column => {
      return { value: `Value ${row} - ${column}` };
    });
  });
};

let cells = generateCells(1000, 50);

const CellComponent = ({ cell, style }) => {
  return <div className="cell value-cell" style={style}>{cell && cell.value}</div>
};

export const defaultComponent = props => {
  return (
    <Spreadsheet
        defaultRowHeight={30}
        defaultColumnWidth={120}
        cells={cells}
        totalRows={1000}
        totalColumns={50}
        height="100vh"
        overscroll={2}
        CellComponent={CellComponent}
        columnHeadingHeight={20}
        rowHeadingWidth={40}
        {...props} />
  )
};

export const fixedRows = props => {
  return (
    <Spreadsheet
        defaultRowHeight={30}
        defaultColumnWidth={120}
        cells={cells}
        totalRows={cells.length}
        totalColumns={cells[0].length}
        height="100vh"
        overscroll={2}
        CellComponent={CellComponent}
        columnHeadingHeight={20}
        rowHeadingWidth={40}
        fixRows={2}
        {...props} />
  )
};

export const fixedColumns = props => {
  return (
    <Spreadsheet
        defaultRowHeight={30}
        defaultColumnWidth={120}
        cells={cells}
        totalRows={cells.length}
        totalColumns={cells[0].length}
        height="100vh"
        overscroll={2}
        CellComponent={CellComponent}
        columnHeadingHeight={20}
        rowHeadingWidth={40}
        fixColumns={2}
        {...props} />
  )
};

export const fixedRowsAndColumns = props => {
  return (
    <Spreadsheet
        defaultRowHeight={30}
        defaultColumnWidth={120}
        cells={cells}
        totalRows={cells.length}
        totalColumns={cells[0].length}
        height="100vh"
        overscroll={2}
        CellComponent={CellComponent}
        columnHeadingHeight={20}
        rowHeadingWidth={40}
        fixRows={2}
        fixColumns={2}
        {...props} />
  )
};

storiesOf('Spreadsheet', module)
    .add('default', defaultComponent)
    .add('fixed rows', fixedRows)
    .add('fixed columns', fixedColumns)
    .add('fixed rows and columns', fixedRowsAndColumns);