import { CSSProperties } from 'react';
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
}

const SpreadsheetView = <T extends unknown>({
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
  RowComponent,
  rowComponentProps,
}: SpreadsheetViewProps<T>) => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `${hideRowsHeadings ? '' : `${rowHeadingWidth}px `}auto`,
  };

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
    visibleRowsIndexes,
    visibleColumnsIndexes,
    CellComponent,
    RowComponent,
    rowComponentProps,
  });

  const specialCellsElement = (
    <SpecialCells
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
      containerRef={scrollerContainerRef}
      style={{ ...style, ...containerStyle }}
      className={className}
      value={cells}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
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
