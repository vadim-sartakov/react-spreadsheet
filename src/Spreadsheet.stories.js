import React from 'react';
import Spreadsheet from './Spreadsheet';
import { withKnobs, number } from '@storybook/addon-knobs';
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

export default {
  Component: Spreadsheet,
  title: 'Spreadsheet',
  decorators: [withKnobs]
};

export const defaultComponent = props => {
  const fixRows = number('Fix rows', 0, { min: 0 });
  const fixColumns = number('Fix columns', 0, { min: 0 });
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
        fixRows={fixRows}
        fixColumns={fixColumns}
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