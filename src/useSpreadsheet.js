import { useState, useMemo, useCallback, useRef } from 'react';
import { getCellsSize } from '@vadim-sartakov/react-scroller/lib/utils';

const useSpreadsheet = ({
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
  fixColumns
}) => {
  const [rowsScrollData, onRowsScrollDataChange] = useState();
  const [columnsScrollData, onColumnsScrollDataChange] = useState();
  // Storing root container ref on root level to prveent excessive updates of inner scrollers
  const scrollerContainerRef = useRef();

  const [cellsState, setCellsState] = useState(defaultCells || []);
  const cells = cellsProp || cellsState;
  const onCellsChange = onCellsChangeProp || setCellsState;

  const [rowsState, setRowsState] = useState(defaultRows || []);
  let rows = rowsProp || rowsState;
  rows = useMemo(() => [...new Array(totalRows).keys()].map(key => ({ ...rows[key], key })).filter(row => !row || !row.hidden), [totalRows, rows]);
  const onRowsChange = onRowsChangeProp || setRowsState;

  const [columnsState, setColumnsState] = useState(defaultColumns || []);
  let columns = columnsProp || columnsState;
  columns = useMemo(() => [...new Array(totalColumns).keys()].map(key => ({ ...columns[key], key })).filter(column => !column || !column.hidden), [totalColumns, columns]);
  const onColumnsChange = onColumnsChangeProp || setColumnsState;

  const rowsSizes = useMemo(() => rows.map(row => row && row.size), [rows]);
  const onRowsSizesChange = useCallback(rowsSetter => {
    onRowsChange(rows => {
      const curRowsSizes = rows.map(row => row && row.size);
      const nextSizes = rowsSetter(curRowsSizes);
      const nextRows = nextSizes.map((size, index) => {
        const curRow = rows[index] || {};
        return { ...curRow, size };
      });
      return nextRows;
    });
  }, [onRowsChange]);
  const columnsSizes = useMemo(() => columns.map(column => column && column.size), [columns]);
  const onColumnsSizesChange = useCallback(columnsSetter => {
    onColumnsChange(columns => {
      const curColumnsSizes = columns.map(column => column && column.size);
      const nextSizes = columnsSetter(curColumnsSizes);
      const nextColumns = nextSizes.map((size, index) => {
        const curColumn = columns[index] || {};
        return { ...curColumn, size };
      });
      return nextColumns;
    });
  }, [onColumnsChange]);

  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);

  const onScroll = useCallback(e => {
    setScrolledTop(e.target.scrollTop > 0 ? true : false);
    setScrolledLeft(e.target.scrollLeft > 0 ? true : false);
  }, []);

  const specialRowsSize = useMemo(() => {
    return hideHeadings ? 0 : columnHeadingHeight;
  }, [hideHeadings, columnHeadingHeight]);
  const specialColumnsSize = useMemo(() => {
    return hideHeadings ? 0 : rowHeadingWidth;
  }, [hideHeadings, rowHeadingWidth]);

  const fixedColumnsSize = useMemo(() => fixColumns ? getCellsSize({
    count: fixColumns,
    sizes: columnsSizes,
    defaultSize: defaultColumnWidth
  }) : 0, [fixColumns, defaultColumnWidth, columnsSizes]);

  const fixedRowsSize = useMemo(() => fixRows ? getCellsSize({
    count: fixRows,
    sizes: rowsSizes,
    defaultSize: defaultRowHeight
  }) : 0, [fixRows, defaultRowHeight, rowsSizes]);

  const containerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${fixedColumnsSize ? `${fixedColumnsSize + specialColumnsSize}px ` : ''}auto`
  }), [fixedColumnsSize, specialColumnsSize]);

  return {
    scrollerContainerRef,
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
    containerStyle
  };
};

export default useSpreadsheet;