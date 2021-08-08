import { CSSProperties, useMemo } from 'react';
import * as React from 'react';
import {
  useScroller,
  useResizer,
  renderCells,
  GridScrollerContainer,
  GridScrollerCellRenderProps,
} from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import MergedCells from './MergedCells';
import {
  SpreadsheetViewProps as SpreadsheetViewPropsBase,
  Cell,
} from './types';

export interface SpreadsheetViewProps<T> extends SpreadsheetViewPropsBase {
  style?: CSSProperties;
  className?: string;
  cells: Cell<T>[][];
  width?: string | number;
  height?: string | number;
  RowComponent?: React.FC | string;
  rowComponentProps?: Record<string, unknown>;
  CellComponent: React.FC<GridScrollerCellRenderProps<Cell<T>>>;
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
}

const SpreadsheetView = <T extends unknown>({
  scrollerContainerRef: scrollerContainerRefProp,
  style,
  className,
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
  rowsScrollData,
  columnsScrollData,
  hideRowsHeadings,
  hideColumnsHeadings,
  width,
  height,
  overscroll,
  scrolledTop,
  scrolledLeft,
  CellComponent,
}: SpreadsheetViewProps<T>) => {
  const containerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${hideRowsHeadings ? '' : `${rowHeadingWidth}px `}auto`,
  }), [hideRowsHeadings, rowHeadingWidth]);

  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
    rowsScroller,
    columnsScroller,
  } = useScroller({
    scrollerContainerRef: scrollerContainerRefProp,
    height,
    width,
    defaultRowHeight,
    defaultColumnWidth,
    totalRows,
    totalColumns,
    rowsSizes,
    columnsSizes,
    overscroll,
    rowsScrollData,
    columnsScrollData,
    gridLayout: true,
  });

  useResizer({
    scrollerContainerRef,
    rowsScroller,
    columnsScroller,
    width,
    height,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  });

  const elements = renderCells({
    value: cells,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    CellComponent,
    RowComponent: React.Fragment,
  });

  const specialCellsElement = (
    <SpecialCells
      scrollerContainerRef={scrollerContainerRef}
      rowsScrollData={rowsScrollData}
      columnsScrollData={columnsScrollData}
      overscroll={overscroll}
      rows={rows}
      columns={columns}
      rowsSizes={rowsSizes}
      onRowsSizesChange={onRowsSizesChange}
      columnsSizes={columnsSizes}
      onColumnsSizesChange={onColumnsSizesChange}
      rowHeadingWidth={rowHeadingWidth}
      columnHeadingHeight={columnHeadingHeight}
      hideRowsHeadings={hideRowsHeadings}
      hideColumnsHeadings={hideColumnsHeadings}
      totalRows={totalRows}
      totalColumns={totalColumns}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      scrolledTop={scrolledTop}
      scrolledLeft={scrolledLeft}
    />
  );

  const mergedCellsElement = <MergedCells />;

  return (
    <GridScrollerContainer
      style={{ ...style, ...containerStyle }}
      className={className}
      onScroll={onScroll}
      width={width}
      height={height}
    >
      {specialCellsElement}
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
      {mergedCellsElement}
    </GridScrollerContainer>
  );
};

export default SpreadsheetView;
