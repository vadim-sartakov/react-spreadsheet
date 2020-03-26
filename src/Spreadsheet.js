import React, { useMemo, useState, useRef, forwardRef, useCallback } from 'react';
import Scroller, { useScroller, ScrollerContainer, renderCells } from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import SpreadsheetCell from './SpreadsheetCell';
import Heading from './Heading';

const HeadingsIntersection = ({ hideHeadings, rowHeadingWidth, columnHeadingHeight }) => {
  return !hideHeadings && (
    <div
        className="heading-cell heading-intersection"
        style={{
          width: rowHeadingWidth,
          height: columnHeadingHeight
        }} />
  );
};

const ColumnsHeadings = forwardRef(({
  overscroll,
  hideHeadings,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData,
  scrolledTop
}, ref) => {
  const columnsHeadingsValue = useMemo(() => [columns], [columns]);
  return !hideHeadings && (
    <Scroller
        ref={ref}
        CellComponent={Heading}
        cellComponentProps={{
          type: 'column',
          defaultSize: defaultColumnWidth,
          sizes: columnsSizes,
          onSizesChange: onColumnsSizesChange
        }}
        rowComponentProps={{ className: 'row' }}
        value={columnsHeadingsValue}
        height={columnHeadingHeight}
        columnsSizes={columnsSizes}
        className={`columns-headings${scrolledTop ? ' last-row' : ''}`}
        overscroll={overscroll}
        totalRows={1}
        totalColumns={totalColumns}
        defaultColumnWidth={defaultColumnWidth}
        defaultRowHeight={columnHeadingHeight}
        columnsScrollData={columnsScrollData} />
  )
});

const RowsHeadings = forwardRef(({
  overscroll,
  hideHeadings,
  rowHeadingWidth = 40,
  rowsSizes,
  onRowsSizesChange,
  defaultRowHeight,
  rows,
  totalRows,
  rowsScrollData,
  scrolledLeft
}, ref) => {
  return !hideHeadings && (
    <Scroller
        ref={ref}
        CellComponent={Heading}
        cellComponentProps={{
          type: 'row',
          defaultSize: defaultRowHeight,
          sizes: rowsSizes,
          onSizesChange: onRowsSizesChange
        }}
        rowComponentProps={{ className: 'row' }}
        value={rows}
        width={rowHeadingWidth}
        rowsSizes={rowsSizes}
        className={`rows-headings${scrolledLeft ? ' last-column' : ''}`}
        overscroll={overscroll}
        totalColumns={1}
        totalRows={totalRows}
        defaultColumnWidth={rowHeadingWidth}
        defaultRowHeight={defaultRowHeight}
        rowsScrollData={rowsScrollData} />
  )
});

const Spreadsheet = inputProps => {
  const [rowsScrollData, onRowsScrollDataChange] = useState();
  const [columnsScrollData, onColumnsScrollDataChange] = useState();
  // Storing root container ref on root level to prveent excessive updates of inner scrollers
  const scrollerContainerRef = useRef();

  const spreadsheetProps = useSpreadsheet(inputProps);
  const {
    cells,
    rows,
    columns,
    rowsSizes,
    onRowsSizesChange,
    columnsSizes,
    onColumnsSizesChange
  } = spreadsheetProps;

  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);

  const handleScroll = useCallback(e => {
    setScrolledTop(e.target.scrollTop > 0 ? true : false);
    setScrolledLeft(e.target.scrollLeft > 0 ? true : false);
  }, []);

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
        className={`spreadsheet${className ? ` ${className}`: ''}${noGrid ? ' no-grid' : ''}`}
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