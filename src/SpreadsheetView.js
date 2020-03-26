import React, { forwardRef } from 'react';
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

const SpreadsheetView = forwardRef(({
  style,
  className,
  cells,
  rows,
  columns,
  rowsSizes,
  onRowsSizesChange,
  columnsSizes,
  onColumnsSizesChange,
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