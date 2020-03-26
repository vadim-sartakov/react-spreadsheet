import React, { forwardRef, useMemo, useCallback } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import SpreadsheetCell from './SpreadsheetCell';
import HeadingsIntersection from './headings/HeadingsIntersection';
import ColumnsHeadings from './headings/ColumnsHeadings';
import RowsHeadings from './headings/RowsHeadings';

const SpecialCells = forwardRef(({
  rowsScrollData,
  columnsScrollData,
  rows,
  columns,
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  rowsSizes,
  onRowsSizesChange,
  columnsSizes,
  onColumnsSizesChange,
  rowHeadingWidth,
  columnHeadingHeight,
  hideRowsHeadings,
  hideColumnsHeadings,
  overscroll,
  scrolledTop,
  scrolledLeft
}, ref) => {
  const headingsIntersectionElement = (
    <HeadingsIntersection
        hideRowsHeadings={hideRowsHeadings}
        hideColumnsHeadings={hideColumnsHeadings}
        rowHeadingWidth={rowHeadingWidth}
        columnHeadingHeight={columnHeadingHeight} />
  );

  const columnsHeadingsElement = (
    <ColumnsHeadings
        ref={ref}
        columns={columns}
        columnHeadingHeight={columnHeadingHeight}
        totalColumns={totalColumns}
        columnsSizes={columnsSizes}
        onColumnsSizesChange={onColumnsSizesChange}
        defaultColumnWidth={defaultColumnWidth}
        hideColumnsHeadings={hideColumnsHeadings}
        columnsScrollData={columnsScrollData}
        overscroll={overscroll}
        scrolledTop={scrolledTop} />
  );

  const rowsHeadingsElement = (
    <RowsHeadings
        ref={ref}
        rows={rows}
        rowHeadingWidth={rowHeadingWidth}
        totalRows={totalRows}
        rowsSizes={rowsSizes}
        onRowsSizesChange={onRowsSizesChange}
        defaultRowHeight={defaultRowHeight}
        hideRowsHeadings={hideRowsHeadings}
        rowsScrollData={rowsScrollData}
        overscroll={overscroll}
        scrolledLeft={scrolledLeft} />
  );
  return (
    <>
      {headingsIntersectionElement}
      {columnsHeadingsElement}
      {rowsHeadingsElement}
    </>
  )
});

const MergedCells = () => {
  return (
    <>
    </>
  )
};

function getArraySubset({ array, startRowIndex = 0, endRowIndex, startColumnIndex = 0, endColumnIndex }) {
  return array.slice(startRowIndex, endRowIndex)
      .map(row => row && row.slice(startColumnIndex, endColumnIndex));
};

function restoreArrayFromSubset({ sourceArray, arraySubset, startIndex = 0, totalCount }) {
  return [...new Array(totalCount).keys()].map((rowIndex) => {
    const row = sourceArray[rowIndex];
    const subsetRow = arraySubset[rowIndex - startIndex];
    return subsetRow || row;
  });
};

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