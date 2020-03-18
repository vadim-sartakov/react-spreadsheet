import React, { useMemo, useState, useRef, forwardRef, useCallback } from 'react';
import Scroller, { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import SpreadsheetCell from './SpreadsheetCell';
import Heading from './Heading';

const HeadingsIntersection = ({ rowHeadingWidth, columnHeadingHeight }) => {
  return (
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
        cellComponentProps={{ mode: 'column' }}
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
        cellComponentProps={{ mode: 'row' }}
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

  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);

  const handleScroll = useCallback(e => {
    setScrolledTop(e.target.scrollTop > 0 ? true : false);
    setScrolledLeft(e.target.scrollLeft > 0 ? true : false);
  }, []);

  let props = { ...inputProps, ...spreadsheetProps };
  const scrollerProps = useScroller({
    ...props,
    value: props.cells,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    scrollerContainerRef,
    onScroll: handleScroll
  });
  props = { ...props, ...scrollerProps };

  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    scrollAreaStyle,
    visibleAreaStyle,
    hideHeadings,
    noGrid,
    cells,
    rowsSizes,
    columnsSizes,
    rows,
    columns,
    rowHeadingWidth,
    columnHeadingHeight,
    totalRows,
    totalColumns,
    defaultRowHeight,
    defaultColumnWidth,
    overscroll,
    CellComponent
  } = props;

  const resultClassName = `spreadsheet${noGrid ? ' no-grid' : ''}`;

  const columnsHeadingsElement = (
    <ColumnsHeadings
        ref={scrollerContainerRef}
        columns={columns}
        columnHeadingHeight={columnHeadingHeight}
        totalColumns={totalColumns}
        columnsSizes={columnsSizes}
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
        defaultRowHeight={defaultRowHeight}
        hideHeadings={hideHeadings}
        rowsScrollData={rowsScrollData}
        overscroll={overscroll}
        scrolledLeft={scrolledLeft} />
  );

  const valueElements = visibleRowsIndexes.map(rowIndex => {
    const columnsElements = visibleColumnsIndexes.map(columnIndex => {
      return <SpreadsheetCell key={columnIndex} Component={CellComponent} rowIndex={rowIndex} columnIndex={columnIndex} />
    });
    return <div key={rowIndex} className="row">{columnsElements}</div>;
  });

  return (
    <ScrollerContainer
        ref={scrollerContainerRef}
        className={resultClassName}
        value={cells}
        style={{ display: 'grid', gridTemplateColumns: `${rowHeadingWidth}px auto` }}
        {...props}>
      <HeadingsIntersection rowHeadingWidth={rowHeadingWidth} columnHeadingHeight={columnHeadingHeight} />
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