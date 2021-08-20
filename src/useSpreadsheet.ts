import {
  useState,
  useMemo,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { getCellsSize } from '@vadim-sartakov/react-scroller/utils';
import { UseSpreadsheetProps } from './types';

const useSpreadsheet = <T>({
  cells: cellsProp,
  onCellsChange: onCellsChangeProp,
  rows: rowsProp,
  onRowsChange: onRowsChangeProp,
  columns: columnsProp,
  onColumnsChange: onColumnsChangeProp,
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  hideHeadings,
  columnHeadingHeight,
  rowHeadingWidth,
  fixRows,
  fixColumns,
}: UseSpreadsheetProps<T>) => {
  const spreadsheetContainerRef = useRef<HTMLDivElement>();

  const [cellsState, setCellsState] = useState([]);
  const cells = cellsProp || cellsState;
  const onCellsChange = onCellsChangeProp || setCellsState;

  const [rowsState, setRowsState] = useState([]);
  let rows = rowsProp || rowsState;
  rows = useMemo(
    () => (
      [...new Array(totalRows).keys()]
        .map(index => ({ ...rows[index], index }))
        .filter(row => !row || !row.hidden)
    ),
    [totalRows, rows],
  );
  const onRowsChange = onRowsChangeProp || setRowsState;

  const [columnsState, setColumnsState] = useState([]);
  let columns = columnsProp || columnsState;
  columns = useMemo(
    () => [...new Array(totalColumns).keys()]
      .map(index => ({ ...columns[index], index }))
      .filter(column => !column || !column.hidden),
    [totalColumns, columns],
  );
  const onColumnsChange = onColumnsChangeProp || setColumnsState;

  const rowsSizes = useMemo(() => rows.map(row => row && row.size), [rows]);
  const onRowsSizesChange: Dispatch<SetStateAction<number[]>> = useCallback(rowsSetter => {
    onRowsChange(rows => {
      const curRowsSizes = rows.map(row => row && row.size);
      const nextSizes = typeof rowsSetter === 'function'
        ? rowsSetter(curRowsSizes) : rowsSetter;
      const nextRows = nextSizes.map((size, index) => {
        const curRow = rows[index] || { index };
        return { ...curRow, size };
      });
      return nextRows;
    });
  }, [onRowsChange]);

  const columnsSizes = useMemo(() => columns.map(column => column && column.size), [columns]);
  const onColumnsSizesChange: Dispatch<SetStateAction<number[]>> = useCallback(columnsSetter => {
    onColumnsChange(columns => {
      const curColumnsSizes = columns.map(column => column && column.size);
      const nextSizes = typeof columnsSetter === 'function'
        ? columnsSetter(curColumnsSizes) : columnsSetter;
      const nextColumns = nextSizes.map((size, index) => {
        const curColumn = columns[index] || { index };
        return { ...curColumn, size };
      });
      return nextColumns;
    });
  }, [onColumnsChange]);

  const specialRowsSize = useMemo(
    () => (hideHeadings ? 0 : columnHeadingHeight),
    [hideHeadings, columnHeadingHeight],
  );
  const specialColumnsSize = useMemo(
    () => (hideHeadings ? 0 : rowHeadingWidth),
    [hideHeadings, rowHeadingWidth],
  );

  const fixedColumnsSize = useMemo(
    () => (
      fixColumns
        ? getCellsSize({
          count: fixColumns,
          sizes: columnsSizes,
          defaultSize: defaultColumnWidth,
        })
        : 0
    ),
    [fixColumns, defaultColumnWidth, columnsSizes],
  );

  const fixedRowsSize = useMemo(
    () => (
      fixRows
        ? getCellsSize({
          count: fixRows,
          sizes: rowsSizes,
          defaultSize: defaultRowHeight,
        })
        : 0
    ),
    [fixRows, defaultRowHeight, rowsSizes],
  );

  const containerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${fixedColumnsSize ? `${fixedColumnsSize + specialColumnsSize}px ` : ''}auto`,
  }), [fixedColumnsSize, specialColumnsSize]);

  const valueContainerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${fixColumns || hideHeadings ? '' : `${rowHeadingWidth}px `}auto`,
    marginTop: -fixedRowsSize,
    marginLeft: -fixedColumnsSize,
  }), [fixColumns, hideHeadings, rowHeadingWidth, fixedRowsSize, fixedColumnsSize]);

  return {
    spreadsheetContainerRef,
    cells,
    onCellsChange,
    rows,
    onRowsChange,
    columns,
    onColumnsChange,
    rowsSizes,
    onRowsSizesChange,
    columnsSizes,
    onColumnsSizesChange,
    specialRowsSize,
    specialColumnsSize,
    fixedRowsSize,
    fixedColumnsSize,
    containerStyle,
    valueContainerStyle,
  };
};

export default useSpreadsheet;
