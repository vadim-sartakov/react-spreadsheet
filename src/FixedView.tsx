import { CSSProperties, useMemo, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import {
  useScroller,
  renderCells,
  GridScrollerContainer,
  GridScrollerCellRenderProps,
} from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import MergedCells from './MergedCells';
import {
  SpreadsheetSizesProps,
  SpreadsheetDataProps,
  SpreadsheetScrollProps,
  Cell,
} from './types';

export interface FixedViewProps<T> extends
  Pick<SpreadsheetScrollProps, 'rowsScrollData' | 'columnsScrollData' | 'overscroll'>,
  SpreadsheetSizesProps,
  Pick<SpreadsheetDataProps<T>, 'cells' | 'rows' | 'columns'> {
  scrollerContainerRef: MutableRefObject<HTMLDivElement>,
  style?: CSSProperties;
  className?: string;
  width?: string | number;
  height?: string | number;
  CellComponent: React.FC<GridScrollerCellRenderProps<Cell<T>>>;
  scrolledTop?: boolean;
  scrolledLeft?: boolean;
  rowsSizes?: number[];
  onRowsSizesChange?: Dispatch<SetStateAction<number[]>>;
  columnsSizes?: number[];
  onColumnsSizesChange?: Dispatch<SetStateAction<number[]>>;
  hideRowsHeadings?: boolean;
  hideColumnsHeadings?: boolean;
}

const FixedView = <T extends unknown>({
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
}: FixedViewProps<T>) => {
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

export default FixedView;
