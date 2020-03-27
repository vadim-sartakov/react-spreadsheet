import React, { forwardRef, useMemo, useCallback } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import SpreadsheetCell from './SpreadsheetCell';
import SpecialCells from './SpecialCells';
import MergedCells from './MergedCells';
import { getArraySubset, restoreArrayFromSubset } from './utils';

const SpreadsheetView = forwardRef(({
  style,
  className,
  startRowIndex = 0,
  endRowIndex,
  startColumnIndex = 0,
  endColumnIndex,
  cells: cellsProp,
  rows: rowsProp,
  columns: columnsProp,
  rowsSizes: rowsSizesProp,
  onRowsSizesChange: onRowsSizesChangeProp,
  columnsSizes: columnsSizesProp,
  onColumnsSizesChange: onColumnsSizesChangeProp,
  defaultRowHeight,
  defaultColumnWidth,
  columnHeadingHeight,
  rowHeadingWidth,
  totalRows,
  totalColumns,
  rowsScrollData,
  columnsScrollData,
  hideRowsHeadings,
  hideColumnsHeadings,
  width,
  height,
  overscroll,
  scrolledTop,
  scrolledLeft,
  CellComponent
}, ref) => {
  const cells = useMemo(() => getArraySubset({ array: cellsProp, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex }),
      [cellsProp, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex]);
  const rows = useMemo(() => rowsProp.slice(startRowIndex, endRowIndex), [rowsProp, startRowIndex, endRowIndex]);
  const columns = useMemo(() => columnsProp.slice(startColumnIndex, endColumnIndex), [columnsProp, startColumnIndex, endColumnIndex]);
  const rowsSizes = useMemo(() => rowsSizesProp.slice(startRowIndex, endRowIndex), [rowsSizesProp, startRowIndex, endRowIndex]);;
  const columnsSizes = useMemo(() => columnsSizesProp.slice(startColumnIndex, endColumnIndex), [columnsSizesProp, startColumnIndex, endColumnIndex]);

  const onRowsSizesChange = useCallback(setRowsSizes => {
    onRowsSizesChangeProp(rowsSizes => {
      const curRowsSizes = rowsSizes.slice(startRowIndex, endRowIndex);
      const nextRowsSizes = setRowsSizes(curRowsSizes);
      const restoredSizes = restoreArrayFromSubset({ sourceArray: rowsSizes, arraySubset: nextRowsSizes, startIndex: startRowIndex, totalCount: totalRows });
      return restoredSizes;
    });
  }, [onRowsSizesChangeProp, startRowIndex, endRowIndex, totalRows]);

  const onColumnsSizesChange = useCallback(setColumnsSizes => {
    onColumnsSizesChangeProp(columnsSizes => {
      const curColumnsSizes = columnsSizes.slice(startColumnIndex, endColumnIndex);
      const nextColumnsSizes = setColumnsSizes(curColumnsSizes);
      const restoredSizes = restoreArrayFromSubset({ sourceArray: columnsSizes, arraySubset: nextColumnsSizes, startIndex: startColumnIndex, totalCount: totalColumns });
      return restoredSizes;
    });
  }, [onColumnsSizesChangeProp, startColumnIndex, endColumnIndex, totalColumns]);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `${hideRowsHeadings ? '' : `${rowHeadingWidth}px `}auto`
  };
  return (
    <Scroller
        ref={ref}
        style={{ ...style, ...containerStyle }}
        className={className}
        value={cells}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        totalRows={totalRows}
        totalColumns={totalColumns}
        rowComponentProps={{ className: 'row' }}
        CellComponent={SpreadsheetCell}
        cellComponentProps={{ InnerComponent: CellComponent }}
        rowsScrollData={rowsScrollData}
        columnsScrollData={columnsScrollData}
        width={width}
        height={height}
        overscroll={overscroll}
        PreOuterComponent={SpecialCells}
        preOuterComponentProps={{
          rowsScrollData,
          columnsScrollData,
          overscroll,
          rows,
          columns,
          rowsSizes,
          onRowsSizesChange,
          columnsSizes,
          onColumnsSizesChange,
          rowHeadingWidth,
          columnHeadingHeight,
          hideRowsHeadings,
          hideColumnsHeadings,
          totalRows,
          totalColumns,
          defaultRowHeight,
          defaultColumnWidth,
          scrolledTop,
          scrolledLeft
        }}
        PostOuterComponent={MergedCells} />
  )
});

export default SpreadsheetView;