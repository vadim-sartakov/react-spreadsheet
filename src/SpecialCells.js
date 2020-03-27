import React, { forwardRef } from 'react';
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

export default SpecialCells;