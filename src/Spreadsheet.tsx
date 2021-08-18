import { CSSProperties, useMemo } from 'react';
import * as React from 'react';
import {
  useScroller,
  GridScrollerContainer,
  renderCells,
  GridScrollerCellRenderProps,
  useResizer,
} from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import FixedView from './FixedView';
import useSpreadsheet from './useSpreadsheet';
import { UseSpreadsheetProps, CellsRange, Cell } from './types';

export interface SpreadsheetProps<T> extends UseSpreadsheetProps<T> {
  style?: CSSProperties;
  className?: string;
  overscroll?: number;
  width?: number | string;
  height: number | string;
  CellComponent: React.FC<GridScrollerCellRenderProps<Cell<T>>>;
  mergedCells?: CellsRange[];
}

const Spreadsheet = <T extends unknown>(inputProps: SpreadsheetProps<T>) => {
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
    width,
    height,
    fixRows = 0,
    fixColumns = 0,
    CellComponent,
  } = inputProps;
  const spreadsheetProps = useSpreadsheet(inputProps);
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
    containerStyle,
  } = spreadsheetProps;

  const scrollerProps = useScroller({
    ...inputProps,
    scrollerContainerRef: spreadsheetContainerRef,
    rowsSizes,
    columnsSizes,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    onScroll: handleScroll,
    gridLayout: true,
  });
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    rowsScroller,
    columnsScroller,
  } = scrollerProps;

  useResizer({
    scrollerContainerRef: spreadsheetContainerRef,
    rowsScroller,
    columnsScroller,
    width,
    height,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  });

  const spreadsheetViewProps = {
    scrollerContainerRef: spreadsheetContainerRef,
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
    gridLayout: true,
    CellComponent,
  };

  const fixedRowsIndexes = useMemo(() => [...Array(fixRows).keys()], [fixRows]);
  const fixedColumnsIndexes = useMemo(() => [...Array(fixColumns).keys()], [fixColumns]);
  const fixedGridTemplateRows = useMemo(
    () => fixedRowsIndexes
      .map(index => `${rowsSizes[index] || defaultRowHeight}px`)
      .join(' '),
    [fixedRowsIndexes, rowsSizes, defaultRowHeight],
  );
  const fixedGridTemplateColumns = useMemo(
    () => fixedColumnsIndexes
      .map(index => `${columnsSizes[index] || defaultColumnWidth}px`)
      .join(' '),
    [fixedColumnsIndexes, columnsSizes, defaultColumnWidth],
  );

  const fixedRowsColumnsIntersection = fixRows && fixColumns ? (
    <FixedView
      {...spreadsheetViewProps}
      totalRows={fixRows}
      totalColumns={fixColumns}
      className={`fixed-rows-columns-intersection last-row last-column${scrolledTop ? ' scrolled-row' : ''}`}
      // Explicit height and width prevents excessive calculations
      height={fixedRowsSize + specialRowsSize}
      width={fixedColumnsSize + specialColumnsSize}
      style={{ overflow: 'hidden' }}
      visibleRowsIndexes={fixedRowsIndexes}
      visibleColumnsIndexes={fixedColumnsIndexes}
      scrollAreaStyle={{
        ...scrollAreaStyle,
        width: fixedColumnsSize,
        height: fixedRowsSize,
      }}
      visibleAreaStyle={{
        ...visibleAreaStyle,
        gridTemplateRows: fixedGridTemplateRows,
        gridTemplateColumns: fixedGridTemplateColumns,
        top: 0,
        left: 0,
      }}
    />
  ) : null;

  const fixedRowsElement = fixRows ? (
    <FixedView
      {...spreadsheetViewProps}
      hideRowsHeadings={Boolean(fixColumns)}
      scrolledLeft={scrolledLeft}
      totalRows={fixRows}
      className={`fixed-rows last-row${scrolledTop ? ' scrolled-row' : ''}`}
      height={fixedRowsSize + specialRowsSize}
      // Without overflow: 'visible' horizontal scroll loses rows headings when scrolled right
      // This happens because by default scroller container sets overflow 'auto' style
      // and this breaks sticky columns because it can't reach root scroll container
      // for proper position calculation
      // (by spec nearest parent container with non default
      // overflow property is picked for sticky element while scrolling)
      style={{ overflow: 'visible', marginLeft: -fixedColumnsSize }}
      visibleRowsIndexes={fixedRowsIndexes}
      visibleColumnsIndexes={visibleColumnsIndexes}
      scrollAreaStyle={{
        ...scrollAreaStyle,
        height: fixedRowsSize,
      }}
      visibleAreaStyle={{
        ...visibleAreaStyle,
        gridTemplateRows: fixedGridTemplateRows,
        top: 0,
      }}
    />
  ) : null;

  const fixedColumnsElement = fixColumns ? (
    <FixedView
      {...spreadsheetViewProps}
      hideColumnsHeadings={Boolean(fixRows)}
      width={fixedColumnsSize + specialColumnsSize}
      scrolledTop={scrolledTop}
      totalColumns={fixColumns}
      className={`fixed-columns last-column${scrolledLeft ? ' scrolled-column' : ''}`}
      style={{ marginTop: -fixedRowsSize }}
      visibleRowsIndexes={visibleRowsIndexes}
      visibleColumnsIndexes={fixedColumnsIndexes}
      scrollAreaStyle={{
        ...scrollAreaStyle,
        width: fixedColumnsSize,
      }}
      visibleAreaStyle={{
        ...visibleAreaStyle,
        gridTemplateColumns: fixedGridTemplateColumns,
        left: 0,
      }}
    />
  ) : null;

  const specialCellsElement = (
    <SpecialCells
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
      hideRowsHeadings={Boolean(fixColumns) || hideHeadings}
      hideColumnsHeadings={Boolean(fixRows) || hideHeadings}
      scrolledTop={scrolledTop}
      scrolledLeft={scrolledLeft}
      visibleRowsIndexes={visibleRowsIndexes}
      visibleColumnsIndexes={visibleColumnsIndexes}
      scrollAreaStyle={scrollAreaStyle}
      visibleAreaStyle={visibleAreaStyle}
    />
  );

  const bodyElements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    RowComponent: React.Fragment,
    CellComponent,
    value: cells,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
  });

  const valueContainerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${fixColumns || hideHeadings ? '' : `${rowHeadingWidth}px `}auto`,
  }), [fixColumns, hideHeadings, rowHeadingWidth]);

  return (
    <GridScrollerContainer
      containerRef={spreadsheetContainerRef}
      className={`spreadsheet${className ? ` ${className}` : ''}`}
      style={{ ...style, ...containerStyle, overflow: 'auto' }}
      onScroll={onScroll}
      width={width}
      height={height}
    >
      {fixedRowsColumnsIntersection}
      {fixedRowsElement}
      {fixedColumnsElement}
      <div
        style={{
          ...valueContainerStyle,
          marginTop: -fixedRowsSize,
          marginLeft: -fixedColumnsSize,
        }}
      >
        {specialCellsElement}
        <div style={scrollAreaStyle}>
          <div style={visibleAreaStyle}>
            {bodyElements}
          </div>
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default Spreadsheet;
