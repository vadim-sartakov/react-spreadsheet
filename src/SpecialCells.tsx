import { Dispatch, SetStateAction } from 'react';
import HeadingsIntersection from './headings/HeadingsIntersection';
import ColumnsHeadings from './headings/ColumnsHeadings';
import RowsHeadings from './headings/RowsHeadings';
import { SpreadsheetDataProps, SpreadsheetSizesProps } from './types';

export interface SpecialCellsProps extends
  Omit<SpreadsheetSizesProps, 'groupSize' | 'hideHeadings'>,
  Pick<SpreadsheetDataProps<any>, 'rows' | 'columns'> {
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

const SpecialCells = ({
  rows,
  columns,
  defaultRowHeight,
  defaultColumnWidth,
  rowsSizes,
  onRowsSizesChange,
  columnsSizes,
  onColumnsSizesChange,
  rowHeadingWidth,
  columnHeadingHeight,
  hideRowsHeadings,
  hideColumnsHeadings,
  scrolledTop,
  scrolledLeft,
  visibleRowsIndexes,
  visibleColumnsIndexes,
  scrollAreaStyle,
  visibleAreaStyle,
}: SpecialCellsProps) => {
  const headingsIntersectionElement = !hideRowsHeadings && !hideColumnsHeadings && (
    <HeadingsIntersection
      rowHeadingWidth={rowHeadingWidth}
      columnHeadingHeight={columnHeadingHeight}
    />
  );

  const columnsHeadingsElement = !hideColumnsHeadings && (
    <ColumnsHeadings
      columns={columns}
      columnHeadingHeight={columnHeadingHeight}
      columnsSizes={columnsSizes}
      onColumnsSizesChange={onColumnsSizesChange}
      defaultColumnWidth={defaultColumnWidth}
      scrolledTop={scrolledTop}
      visibleColumnsIndexes={visibleColumnsIndexes}
      scrollAreaStyle={scrollAreaStyle}
      visibleAreaStyle={visibleAreaStyle}
    />
  );

  const rowsHeadingsElement = !hideRowsHeadings && (
    <RowsHeadings
      rows={rows}
      rowHeadingWidth={rowHeadingWidth}
      rowsSizes={rowsSizes}
      onRowsSizesChange={onRowsSizesChange}
      defaultRowHeight={defaultRowHeight}
      scrolledLeft={scrolledLeft}
      visibleRowsIndexes={visibleRowsIndexes}
      scrollAreaStyle={scrollAreaStyle}
      visibleAreaStyle={visibleAreaStyle}
    />
  );
  return (
    <>
      {headingsIntersectionElement}
      {columnsHeadingsElement}
      {rowsHeadingsElement}
    </>
  );
};

export default SpecialCells;
