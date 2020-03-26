import React, { useMemo, forwardRef } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';

const FixedRowsColumnsIntersection = forwardRef(({
  cells: cellsProp,
  rowsSizes: rowsSizesProp,
  columnsSizes: columnsSizesProp,
  overscroll,
  defaultRowHeight,
  defaultColumnWidth,
  fixRows,
  fixColumns,
  fixedRowsSize: width,
  fixedColumnsSize: height,
  CellComponent
}, ref) => {
  const rowsSizes = useMemo(() => rowsSizesProp.slice(0, fixRows), [rowsSizesProp, fixRows]);
  const columnsSizes = useMemo(() => columnsSizesProp.slice(0, fixColumns), [columnsSizesProp, fixColumns])
  const cells = useMemo(() => {
    if (!fixRows || !fixColumns) return [];
    return cellsProp
        .slice(0, fixRows)
        .map(row => {
          return row.map(cell => cell.slice(0, fixColumns))
        });
  }, [fixRows, fixColumns, cellsProp]);
  return fixRows && fixColumns && (
    <Scroller
      ref={ref}
      CellComponent={CellComponent}
      rowComponentProps={{ className: 'row' }}
      value={cells}
      width={width}
      height={height}
      overscroll={overscroll}
      totalColumns={fixColumns}
      totalRows={fixRows}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={defaultRowHeight}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes} />
  );
});

export default FixedRowsColumnsIntersection;