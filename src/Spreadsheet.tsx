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
import SpreadsheetView from './SpreadsheetView';
import useSpreadsheet from './useSpreadsheet';
import { SpreadsheetPropsBase, CellsRange, Cell } from './types';

export interface SpreadsheetProps<T> extends SpreadsheetPropsBase<T> {
  style?: CSSProperties;
  className?: string;
  overscroll?: number;
  width?: number | string;
  height: number | string;
  CellComponent: React.FC<GridScrollerCellRenderProps<Cell<T>>>;

  /**
   * If set to 'true' then special 'no-grid' class will be appended to root.
   * If default style imported, then grid will be hidden.
   */
  noGrid?: boolean;
  mergedCells?: CellsRange[];
}

const Spreadsheet = <T extends unknown>(inputProps: SpreadsheetProps<T>) => {
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
    rowComponentProps: { className: 'row' },
    CellComponent,
  };

  const fixedRowsColumnsIntersection = fixRows && fixColumns ? (
    <SpreadsheetView
      {...spreadsheetViewProps}
      totalRows={fixRows}
      totalColumns={fixColumns}
      className={`fixed-rows-columns-intersection last-row last-column${scrolledTop ? ' scrolled-row' : ''}`}
      // Explicit height and width prevents excessive calculations
      height={fixedRowsSize + specialRowsSize}
      width={fixedColumnsSize + specialColumnsSize}
      style={{ overflow: 'hidden' }}
    />
  ) : null;

  const fixedRowsElement = fixRows ? (
    <SpreadsheetView
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
      columnsScrollData={columnsScrollData}
    />
  ) : null;

  const fixedColumnsElement = fixColumns ? (
    <SpreadsheetView
      {...spreadsheetViewProps}
      hideColumnsHeadings={Boolean(fixRows)}
      width={fixedColumnsSize + specialColumnsSize}
      scrolledTop={scrolledTop}
      totalColumns={fixColumns}
      className={`fixed-columns last-column${scrolledLeft ? ' scrolled-column' : ''}`}
      rowsScrollData={rowsScrollData}
      style={{ marginTop: -fixedRowsSize }}
    />
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
      hideRowsHeadings={Boolean(fixColumns) || hideHeadings}
      hideColumnsHeadings={Boolean(fixRows) || hideHeadings}
      overscroll={overscroll}
      scrolledTop={scrolledTop}
      scrolledLeft={scrolledLeft}
    />
  );

  const bodyElements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    rowComponentProps: { className: 'row' },
    CellComponent,
    cellComponentProps: { InnerComponent: CellComponent },
  });

  const valueContainerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${fixColumns || hideHeadings ? '' : `${rowHeadingWidth}px `}auto`,
  }), [fixColumns, hideHeadings, rowHeadingWidth]);

  return (
    <GridScrollerContainer
      {...restInputProps}
      containerRef={spreadsheetContainerRef}
      className={`spreadsheet${className ? ` ${className}` : ''}${noGrid ? ' no-grid' : ''}`}
      style={{ ...style, ...containerStyle, overflow: 'auto' }}
      onScroll={onScroll}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      value={cells}
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
          <div style={{ ...visibleAreaStyle }}>
            {bodyElements}
          </div>
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default Spreadsheet;
