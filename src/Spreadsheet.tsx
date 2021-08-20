import { CSSProperties, useMemo, useState, useCallback } from 'react';
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
  CellComponent: React.FC<GridScrollerCellRenderProps<Cell<T>>>;
  mergedCells?: CellsRange[];
}

const Spreadsheet = <T extends unknown>({
  style,
  className,
  cells: cellsProp,
  onCellsChange: onCellsChangeProp,
  rows: rowsProp,
  onRowsChange: onRowsChangeProp,
  columns: columnsProp,
  onColumnsChange: onColumnsChangeProp,
  defaultRowHeight,
  defaultColumnWidth,
  rowHeadingWidth,
  columnHeadingHeight,
  totalRows,
  totalColumns,
  overscroll,
  hideHeadings,
  fixRows = 0,
  fixColumns = 0,
  CellComponent,
}: SpreadsheetProps<T>) => {
  const {
    spreadsheetContainerRef,
    cells,
    rows,
    columns,
    rowsSizes,
    columnsSizes,
    onRowsSizesChange,
    onColumnsSizesChange,
    fixedRowsSize,
    fixedColumnsSize,
    specialRowsSize,
    specialColumnsSize,
    containerStyle,
    valueContainerStyle,
  } = useSpreadsheet({
    cells: cellsProp,
    onCellsChange: onCellsChangeProp,
    rows: rowsProp,
    onRowsChange: onRowsChangeProp,
    columns: columnsProp,
    onColumnsChange: onColumnsChangeProp,
    defaultRowHeight,
    defaultColumnWidth,
    totalRows,
    totalColumns,
    hideHeadings,
    columnHeadingHeight,
    rowHeadingWidth,
    fixRows,
    fixColumns,
  });

  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);

  const scrollerProps = useScroller({
    scrollerContainerRef: spreadsheetContainerRef,
    defaultRowHeight,
    defaultColumnWidth,
    totalRows,
    totalColumns,
    rowsSizes,
    columnsSizes,
    overscroll,
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
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  } = scrollerProps;

  useResizer({
    scrollerContainerRef: spreadsheetContainerRef,
    rowsScroller,
    columnsScroller,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  });

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(e => {
    onScroll(e);
    setScrolledTop((e.target as HTMLDivElement).scrollTop > 0);
    setScrolledLeft((e.target as HTMLDivElement).scrollLeft > 0);
  }, [onScroll]);

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

  return (
    <GridScrollerContainer
      containerRef={spreadsheetContainerRef}
      className={`spreadsheet${className ? ` ${className}` : ''}`}
      style={{ ...style, ...containerStyle, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      {fixedRowsColumnsIntersection}
      {fixedRowsElement}
      {fixedColumnsElement}
      <div
        style={valueContainerStyle}
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
