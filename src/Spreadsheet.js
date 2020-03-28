import React, { forwardRef } from 'react';
import { useScroller, ScrollerContainer, renderCells } from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import SpreadsheetCell from './SpreadsheetCell';
import SpreadsheetView from './FixedView';
import useSpreadsheet from './useSpreadsheet';

const Spreadsheet = forwardRef((inputProps, ref) => {
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
  const spreadsheetProps = useSpreadsheet({ ...inputProps, ref });
  const {
    spreadsheetContainerRef,
    cells,
    rows,
    columns,
    rowsSizes,
    onRowsSizesChange,
    columnsSizes,
    onColumnsSizesChange,
    specialRowsSize,
    specialColumnsSize,
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
    ref: spreadsheetContainerRef,
    onScroll: handleScroll
  });
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle
  } = scrollerProps;

  const spreadsheetViewProps = {
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

  const fixedRowsColumnsIntersection = fixRows && fixColumns ? (
    <SpreadsheetView
        {...spreadsheetViewProps}
        totalRows={fixRows}
        totalColumns={fixColumns}
        className={`fixed-rows-columns-intersection last-row last-column${scrolledTop ? ' scrolled-row' : ''}` }
        // Explicit height and width prevents excessive calculations
        height={fixedRowsSize + specialRowsSize}
        width={fixedColumnsSize + specialColumnsSize}
        style={{ overflow: 'hidden' }} />
  ) : null;

  const fixedRowsElement = fixRows ? (
    <SpreadsheetView
        {...spreadsheetViewProps}
        hideRowsHeadings={fixColumns}
        scrolledLeft={scrolledLeft}
        totalRows={fixRows}
        className={`fixed-rows last-row${scrolledTop ? ' scrolled-row' : ''}`}
        height={fixedRowsSize + specialRowsSize}
        // Without overflow: 'visible' horizontal scroll loses rows headings when scrolled right
        // This happens because by default scroller container sets overflow 'auto' style
        // and this breaks sticky columns because it can't reach root scroll container
        // for proper position calculation
        // (by spec nearest parent container with non default overflow property is picked for sticky element while scrolling)
        style={{ overflow: 'visible', marginLeft: -fixedColumnsSize }}
        columnsScrollData={columnsScrollData} />
  ) : null;

  const fixedColumnsElement = fixColumns ? (
    <SpreadsheetView
        {...spreadsheetViewProps}
        hideColumnsHeadings={fixRows}
        width={fixedColumnsSize + specialColumnsSize}
        scrolledTop={scrolledTop}
        totalColumns={fixColumns}
        className={`fixed-columns last-column${scrolledLeft ? ' scrolled-column' : ''}`}
        rowsScrollData={rowsScrollData}
        style={{ marginTop: -fixedRowsSize }} />
  ) : null;

  const specialCellsElement = (
    <SpecialCells
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
        hideRowsHeadings={fixColumns || hideHeadings}
        hideColumnsHeadings={fixRows || hideHeadings}
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
    gridTemplateColumns: `${fixColumns || hideHeadings ? '' : `${rowHeadingWidth}px `}auto`
  };

  return (
    <ScrollerContainer
        {...restInputProps}
        ref={spreadsheetContainerRef}
        className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
        style={{ ...style, ...containerStyle, overflow: 'auto' }}
        onScroll={onScroll}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}
        value={cells}
        width={width}
        height={height}>
      {fixedRowsColumnsIntersection}
      {fixedRowsElement}
      {fixedColumnsElement}
      <div style={{ ...valueContainerStyle, marginTop: -fixedRowsSize, marginLeft: -fixedColumnsSize }}>
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