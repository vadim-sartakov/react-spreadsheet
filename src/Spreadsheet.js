import React from 'react';
import { useScroller, ScrollerContainer, renderCells } from '@vadim-sartakov/react-scroller';
import HeadingsIntersection from './headings/HeadingsIntersection';
import ColumnsHeadings from './headings/ColumnsHeadings';
import RowsHeadings from './headings/RowsHeadings';
import useSpreadsheet from './useSpreadsheet';
import SpreadsheetCell from './SpreadsheetCell';

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
    scrolledLeft
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

  const {
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
    CellComponent,
    ...restInputProps
  } = inputProps;

  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle
  } = scrollerProps;

  const columnsHeadingsElement = (
    <ColumnsHeadings
        ref={scrollerContainerRef}
        columns={columns}
        columnHeadingHeight={columnHeadingHeight}
        totalColumns={totalColumns}
        columnsSizes={columnsSizes}
        onColumnsSizesChange={onColumnsSizesChange}
        defaultColumnWidth={defaultColumnWidth}
        hideHeadings={hideHeadings}
        columnsScrollData={columnsScrollData}
        overscroll={overscroll}
        width={scrollAreaStyle.width}
        scrolledTop={scrolledTop} />
  );

  const rowsHeadingsElement = (
    <RowsHeadings
        ref={scrollerContainerRef}
        rows={rows}
        rowHeadingWidth={rowHeadingWidth}
        totalRows={totalRows}
        rowsSizes={rowsSizes}
        onRowsSizesChange={onRowsSizesChange}
        defaultRowHeight={defaultRowHeight}
        hideHeadings={hideHeadings}
        rowsScrollData={rowsScrollData}
        overscroll={overscroll}
        scrolledLeft={scrolledLeft} />
  );

  const valueElements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    rowComponentProps: { className: 'row' },
    CellComponent: SpreadsheetCell,
    cellComponentProps: { InnerComponent: CellComponent }
  });

  return (
    <ScrollerContainer
        {...restInputProps}
        ref={scrollerContainerRef}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        width={width}
        height={height}
        className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
        value={cells}
        style={{ ...style, display: 'grid', gridTemplateColumns: `${hideHeadings ? '' : `${rowHeadingWidth}px `}auto` }}
        onScroll={onScroll}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}>
      <HeadingsIntersection hideHeadings={hideHeadings} rowHeadingWidth={rowHeadingWidth} columnHeadingHeight={columnHeadingHeight} />
      {columnsHeadingsElement}
      {rowsHeadingsElement}
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {valueElements}
        </div>
      </div>
    </ScrollerContainer>
  );
};

export default Spreadsheet;