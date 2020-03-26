import React from 'react';
import { useScroller } from '@vadim-sartakov/react-scroller';
import SpreadsheetView from './SpreadsheetView';
import useSpreadsheet from './useSpreadsheet';

const Spreadsheet = inputProps => {
  const spreadsheetProps = useSpreadsheet(inputProps);
  const {
    scrollerContainerRef,
    cells,
    rows,
    columns,
    rowsSizes,
    onRowsSizesChange,
    columnsSizes,
    onColumnsSizesChange,
    //specialRowsSize,
    //specialColumnsSize,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    onScroll: handleScroll,
    scrolledTop,
    scrolledLeft,
    fixedRowsSize,
    fixedColumnsSize,
    containerStyle
  } = spreadsheetProps;

  const scrollerProps = useScroller({
    ...inputProps,
    rowsSizes,
    columnsSizes,
    value: spreadsheetProps.cells,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    scrollerContainerRef,
    onScroll: handleScroll
  });
  const { onScroll, scrollAreaStyle } = scrollerProps;

  const {
    cells: inputCells,
    style,
    className,
    defaultRowHeight,
    defaultColumnWidth,
    rowHeadingWidth,
    columnHeadingHeight,
    totalRows,
    totalColumns,
    overscroll,
    hideHeadings,
    noGrid,
    width,
    height,
    fixRows,
    fixColumns,
    CellComponent,
    ...restInputProps
  } = inputProps;

  const bodyElement = (
    <SpreadsheetView
        ref={scrollerContainerRef}
        cells={cells}
        rows={rows}
        columns={columns}
        rowsSizes={rowsSizes}
        onRowsSizesChange={onRowsSizesChange}
        columnsSizes={columnsSizes}
        onColumnsSizesChange={onColumnsSizesChange}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        columnHeadingHeight={columnHeadingHeight}
        rowHeadingWidth={rowHeadingWidth}
        totalRows={totalRows}
        totalColumns={totalColumns}
        rowsScrollData={rowsScrollData}
        columnsScrollData={columnsScrollData}
        hideRowsHeadings={hideHeadings}
        hideColumnsHeadings={hideHeadings}
        overscroll={overscroll}
        scrolledTop={scrolledTop}
        scrolledLeft={scrolledLeft}
        width={scrollAreaStyle.width}
        CellComponent={CellComponent} />
  );

  return (
    <div
        {...restInputProps}
        ref={scrollerContainerRef}
        className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
        style={{ ...style, ...containerStyle, overflow: 'auto', width, height }}
        onScroll={onScroll}>
      {bodyElement}
    </div>
  );
};

export default Spreadsheet;