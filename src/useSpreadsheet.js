import { useState, useMemo } from 'react';

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
  rows = [...new Array(totalRows).keys()].map(key => ({ ...rows[key], key })).filter(row => !row || !row.hidden);
  const onRowsChange = onRowsChangeProp || setRowsState;

  const [columnsState, setColumnsState] = useState(defaultColumns || []);
  let columns = columnsProp || columnsState;
  columns = [...new Array(totalColumns).keys()].map(key => ({ ...columns[key], key })).filter(column => !column || !column.hidden);
  const onColumnsChange = onColumnsChangeProp || setColumnsState;

  const rowsSizes = useMemo(() => rows.map(row => row.size), [rows]);
  const columnsSizes = useMemo(() => columns.map(column => column.size), [columns]);

  return {
    cells,
    onCellsChange,
    rows,
    onRowsChange,
    columns,
    onColumnsChange,
    rowsSizes,
    columnsSizes
  };
};

export default useSpreadsheet;