import { GridScrollerCellRenderProps } from '@vadim-sartakov/react-scroller';
import { Meta, Story } from '@storybook/react/types-6-0';
import Spreadsheet, { SpreadsheetProps } from './Spreadsheet';
import { Cell } from './types';
import './style.css';

const generateMeta = (count: number) => (
  [...new Array(count).keys()]
);

const generateCells = (rowsCount: number, columnsCount: number): Cell<string>[][] => (
  generateMeta(rowsCount).map(row => (
    generateMeta(columnsCount).map(column => (
      { value: `Value ${row} - ${column}` }
    ))
  ))
);

const CellComponent = ({ value }: GridScrollerCellRenderProps<Cell<string>>) => (
  <div className="cell value-cell">{value && value.value}</div>
);

export default {
  Component: Spreadsheet,
  title: 'Spreadsheet',
  argTypes: {
    totalRows: {
      control: {
        type: 'number',
      },
      defaultValue: 1000,
    },
    totalColumns: {
      control: {
        type: 'number',
      },
      defaultValue: 50,
    },
    defaultRowHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 40,
    },
    defaultColumnWidth: {
      control: {
        type: 'number',
      },
      defaultValue: 120,
    },
    overscroll: {
      control: {
        type: 'number',
      },
      defaultValue: 2,
    },
    focusedCell: {
      type: 'object',
      control: {
        type: 'object',
      },
      defaultValue: { row: 0, cell: 0 },
    },
    fixRows: {
      control: {
        type: 'number',
      },
      defaultValue: 0,
    },
    fixColumns: {
      control: {
        type: 'number',
      },
      defaultValue: 0,
    },
    columnHeadingHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 20,
    },
    rowHeadingWidth: {
      control: {
        type: 'number',
      },
      defaultValue: 40,
    },
  },
} as Meta;

const SpreadsheetTemplate: Story<SpreadsheetProps<string>> = ({
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  overscroll,
  fixRows,
  fixColumns,
  columnHeadingHeight,
  rowHeadingWidth,
}) => {
  const cells = generateCells(totalRows, totalColumns);
  return (
    <Spreadsheet
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      cells={cells}
      totalRows={totalRows}
      totalColumns={totalColumns}
      height="100vh"
      overscroll={overscroll}
      CellComponent={CellComponent}
      columnHeadingHeight={columnHeadingHeight}
      rowHeadingWidth={rowHeadingWidth}
      fixRows={fixRows}
      fixColumns={fixColumns}
    />
  );
};

export const defaultComponent = SpreadsheetTemplate.bind({});
export const fixedRowsColumns = SpreadsheetTemplate.bind({});
fixedRowsColumns.args = {
  fixRows: 2,
  fixColumns: 2,
};
