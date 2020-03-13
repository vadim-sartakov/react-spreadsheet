import { useState } from 'react';

const useSpreadsheet = ({
  defaultCells,
  cells: cellsProp,
  onCellsChange: onCellsChangeProp,
  defaultRows,
  rows: rowsProp,
  onRowsChange: onRowsChangeProp,
  defaultColumns,
  columns: columnsProp,
  onColumnsChange: onColumnsChangeProp
}) => {
  const [cellsState, setCellsState] = useState(defaultCells || []);
  const cells = cellsProp || cellsState;
  const onCellsChange = onCellsChangeProp || setCellsState;

  const [rowsState, setRowsState] = useState(defaultRows || []);
  const rows = rowsProp || rowsState;
  const onRowsChange = onRowsChangeProp || setRowsState;

  const [columnsState, setColumnsState] = useState(defaultColumns || []);
  const columns = columnsProp || columnsState;
  const onColumnsChange = onColumnsChangeProp || setColumnsState;

  return {
    cells,
    onCellsChange,
    rows,
    onRowsChange,
    columns,
    onColumnsChange
  };
};

export default useSpreadsheet;