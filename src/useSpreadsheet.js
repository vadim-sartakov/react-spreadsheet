import { useState, useMemo, useCallback } from 'react';

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
  totalRows,
  totalColumns
}) => {
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

  return {
    cells,
    onCellsChange,
    rows,
    onRowsChange,
    columns,
    onColumnsChange,
    rowsSizes,
    onRowsSizesChange,
    columnsSizes,
    onColumnsSizesChange
  };
};

export default useSpreadsheet;