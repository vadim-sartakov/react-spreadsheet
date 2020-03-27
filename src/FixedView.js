import React, { forwardRef } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import SpreadsheetCell from './SpreadsheetCell';
import SpecialCells from './SpecialCells';
import MergedCells from './MergedCells';

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