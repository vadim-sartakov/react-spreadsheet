import { CSSProperties, useMemo, Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import {
  renderCells,
  GridScrollerContainer,
  GridScrollerCellRenderProps,
} from '@vadim-sartakov/react-scroller';
import SpecialCells from './SpecialCells';
import MergedCells from './MergedCells';
import {
  SpreadsheetSizesProps,
  SpreadsheetDataProps,
  Cell,
} from './types';

export interface FixedViewProps<T> extends
  SpreadsheetSizesProps,
  Pick<SpreadsheetDataProps<T>, 'cells' | 'rows' | 'columns'> {
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
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const FixedView = <T extends unknown>({
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
  hideRowsHeadings,
  hideColumnsHeadings,
  width,
  height,
  scrolledTop,
  scrolledLeft,
  CellComponent,
  visibleRowsIndexes,
  visibleColumnsIndexes,
  scrollAreaStyle,
  visibleAreaStyle,
}: FixedViewProps<T>) => {
  const containerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `${hideRowsHeadings ? '' : `${rowHeadingWidth}px `}auto`,
  }), [hideRowsHeadings, rowHeadingWidth]);

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
      visibleRowsIndexes={visibleRowsIndexes}
      visibleColumnsIndexes={visibleColumnsIndexes}
      scrollAreaStyle={scrollAreaStyle}
      visibleAreaStyle={visibleAreaStyle}
    />
  );

  const mergedCellsElement = <MergedCells />;

  return (
    <GridScrollerContainer
      style={{ ...style, ...containerStyle }}
      className={className}
      width={width}
      height={height}
    >
      {specialCellsElement}
      <div
        style={scrollAreaStyle}
      >
        <div
          style={visibleAreaStyle}
        >
          {elements}
        </div>
      </div>
      {mergedCellsElement}
    </GridScrollerContainer>
  );
};

export default FixedView;
