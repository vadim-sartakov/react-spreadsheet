import {
  useState,
  useMemo,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { getCellsSize } from '@vadim-sartakov/react-scroller/lib/utils';
import { ScrollData } from '@vadim-sartakov/react-scroller';
import { SpreadsheetPropsBase } from './types';

const useSpreadsheet = <T>({
  ref,
  defaultCells,
  cells: cellsProp,
  onCellsChange: onCellsChangeProp,
  defaultRows,
  rows: rowsProp,
  onRowsChange: onRowsChangeProp,
  defaultColumns,
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
}: SpreadsheetPropsBase<T>) => {
  const [rowsScrollData, onRowsScrollDataChange] = useState<ScrollData>();
  const [columnsScrollData, onColumnsScrollDataChange] = useState<ScrollData>();

  const spreadsheetContainerRefLocal = useRef<HTMLDivElement>();
  const spreadsheetContainerRef = ref || spreadsheetContainerRefLocal;

  const [cellsState, setCellsState] = useState(defaultCells || []);
  const cells = cellsProp || cellsState;
  const onCellsChange = onCellsChangeProp || setCellsState;

  const [rowsState, setRowsState] = useState(defaultRows || []);
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

  const [columnsState, setColumnsState] = useState(defaultColumns || []);
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

  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);

  const onScroll: React.UIEventHandler<HTMLDivElement> = useCallback(e => {
    setScrolledTop((<HTMLDivElement>e.target).scrollTop > 0);
    setScrolledLeft((<HTMLDivElement>e.target).scrollLeft > 0);
  }, []);

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

  return {
    spreadsheetContainerRef,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    onScroll,
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
    scrolledTop,
    scrolledLeft,
    fixedRowsSize,
    fixedColumnsSize,
    containerStyle,
  };
};

export default useSpreadsheet;
