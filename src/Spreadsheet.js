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
    specialRowsSize,
    //specialColumnsSize,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    onScroll: handleScroll,
    scrolledTop,
    scrolledLeft,
    fixedRowsSize,
    //fixedColumnsSize,
    containerStyle
  } = spreadsheetProps;

  const scrollerProps = useScroller({
    ...inputProps,
    rowsSizes,
    columnsSizes,
    totalRows: inputProps.totalRows - (inputProps.fixRows || 0),
    totalColumns: inputProps.totalColumns - (inputProps.fixColumns || 0),
    value: spreadsheetProps.cells,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    scrollerContainerRef,
    onScroll: handleScroll
  });
  const { onScroll } = scrollerProps;

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
    fixRows = 0,
    fixColumns = 0,
    CellComponent,
    ...restInputProps
  } = inputProps;

  const spreadsheetViewProps = {
    ref: scrollerContainerRef,
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
    overscroll,
    CellComponent
  };

  const fixedRowsElement = fixRows ? (
    <SpreadsheetView
        {...spreadsheetViewProps}
        scrolledLeft={scrolledLeft}
        totalRows={fixRows}
        className={`fixed-rows last-row${scrolledTop ? ' scrolled' : ''}`}
        // Without overflow: 'visible' horizontal scroll loses rows headings
        style={{ overflow: 'visible' }}
        columnsScrollData={columnsScrollData}
        height={fixedRowsSize + specialRowsSize}
        endRowIndex={fixRows} />
  ) : null;

  const bodyElement = (
    <SpreadsheetView
        {...spreadsheetViewProps}
        scrolledTop={scrolledTop}
        scrolledLeft={scrolledLeft}
        rowsScrollData={rowsScrollData}
        columnsScrollData={columnsScrollData}
        hideColumnsHeadings={fixRows}
        startRowIndex={fixRows}
        totalRows={totalRows - fixRows}
        totalColumns={totalColumns - fixColumns} />
  );

  return (
    <div
        {...restInputProps}
        ref={scrollerContainerRef}
        className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
        style={{ ...style, ...containerStyle, overflow: 'auto', width, height }}
        onScroll={onScroll}>
      {fixedRowsElement}
      {bodyElement}
    </div>
  );
};

export default Spreadsheet;