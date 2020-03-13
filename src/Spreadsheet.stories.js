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

const cells = generateCells(1000, 50);

const CellComponent = ({ value: cell, style }) => {
  return <div className="cell" style={style}>{cell.value}</div>
};

export const defaultComponent = props => {
  return (
    <Spreadsheet
        defaultRowHeight={30}
        defaultColumnWidth={120}
        cells={cells}
        totalRows={cells.length}
        totalColumns={cells[0].length}
        width={800}
        height={600}
        CellComponent={CellComponent}
        {...props} />
  )
};

storiesOf('Spreadsheet', module)
    .add('default', defaultComponent);