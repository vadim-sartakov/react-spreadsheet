import React, { forwardRef } from 'react';
import { useScroller, ScrollerContainer, renderCells } from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import SpreadsheetCell from './SpreadsheetCell';
import SpreadsheetView from './FixedView';
import useSpreadsheet from './useSpreadsheet';

const Spreadsheet = forwardRef((inputProps, inputRef) => {
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

  const rootRef = inputRef || scrollerContainerRef;

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
    scrollerContainerRef: rootRef,
    onScroll: handleScroll
  });
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle
  } = scrollerProps;

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
    ref: rootRef,
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

  const specialCellsElement = (
    <SpecialCells
        ref={rootRef}
        rowsScrollData={rowsScrollData}
        columnsScrollData={columnsScrollData}
        rows={rows}
        columns={columns}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        totalRows={totalRows}
        totalColumns={totalColumns}
        rowsSizes={rowsSizes}
        onRowsSizesChange={onRowsSizesChange}
        columnsSizes={columnsSizes}
        onColumnsSizesChange={onColumnsSizesChange}
        rowHeadingWidth={rowHeadingWidth}
        columnHeadingHeight={columnHeadingHeight}
        hideRowsHeadings={hideHeadings}
        hideColumnsHeadings={hideHeadings}
        overscroll={overscroll}
        scrolledTop={scrolledTop}
        scrolledLeft={scrolledLeft} />
  );

  const bodyElements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    rowComponentProps: { className: 'row' },
    CellComponent: SpreadsheetCell,
    cellComponentProps: { InnerComponent: CellComponent }
  });

  const valueContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `${hideHeadings ? '' : `${rowHeadingWidth}px `}auto`
  };

  return (
    <ScrollerContainer
        {...restInputProps}
        ref={rootRef}
        className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
        style={{ ...style, ...containerStyle, overflow: 'auto', width, height }}
        onScroll={onScroll}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}
        value={cells}
        width={width}
        height={height}>
      {fixedRowsElement}
      <div style={valueContainerStyle}>
        {specialCellsElement}
        <div style={scrollAreaStyle}>
          <div style={{ ...visibleAreaStyle }}>
            {bodyElements}
          </div>
        </div>
      </div>
    </ScrollerContainer>
  );
});

export default Spreadsheet;