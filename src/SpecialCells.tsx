import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import HeadingsIntersection from './headings/HeadingsIntersection';
import ColumnsHeadings from './headings/ColumnsHeadings';
import RowsHeadings from './headings/RowsHeadings';
import { SpreadsheetDataProps, SpreadsheetSizesProps, SpreadsheetScrollProps } from './types';

export interface SpecialCellsProps extends
  Omit<SpreadsheetSizesProps, 'groupSize' | 'hideHeadings'>,
  Pick<SpreadsheetDataProps<any>, 'rows' | 'columns'>,
  Omit<SpreadsheetScrollProps, 'onRowsScrollDataChange' | 'onColumnsScrollDataChange'> {
  scrollerContainerRef: MutableRefObject<HTMLDivElement>;
  scrolledTop?: boolean;
  scrolledLeft?: boolean;
  rowsSizes?: number[];
  onRowsSizesChange?: Dispatch<SetStateAction<number[]>>;
  columnsSizes?: number[];
  onColumnsSizesChange?: Dispatch<SetStateAction<number[]>>;
  hideRowsHeadings?: boolean;
  hideColumnsHeadings?: boolean;
}

const SpecialCells = ({
  scrollerContainerRef,
  rowsScrollData,
  columnsScrollData,
  rows,
  columns,
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  rowsSizes,
  onRowsSizesChange,
  columnsSizes,
  onColumnsSizesChange,
  rowHeadingWidth,
  columnHeadingHeight,
  hideRowsHeadings,
  hideColumnsHeadings,
  overscroll,
  scrolledTop,
  scrolledLeft,
}: SpecialCellsProps) => {
  const headingsIntersectionElement = !hideRowsHeadings && !hideColumnsHeadings && (
    <HeadingsIntersection
      rowHeadingWidth={rowHeadingWidth}
      columnHeadingHeight={columnHeadingHeight}
    />
  );

  const columnsHeadingsElement = !hideColumnsHeadings && (
    <ColumnsHeadings
      scrollerContainerRef={scrollerContainerRef}
      columns={columns}
      columnHeadingHeight={columnHeadingHeight}
      totalColumns={totalColumns}
      columnsSizes={columnsSizes}
      onColumnsSizesChange={onColumnsSizesChange}
      defaultColumnWidth={defaultColumnWidth}
      columnsScrollData={columnsScrollData}
      overscroll={overscroll}
      scrolledTop={scrolledTop}
    />
  );

  const rowsHeadingsElement = !hideRowsHeadings && (
    <RowsHeadings
      scrollerContainerRef={scrollerContainerRef}
      rows={rows}
      rowHeadingWidth={rowHeadingWidth}
      totalRows={totalRows}
      rowsSizes={rowsSizes}
      onRowsSizesChange={onRowsSizesChange}
      defaultRowHeight={defaultRowHeight}
      rowsScrollData={rowsScrollData}
      overscroll={overscroll}
      scrolledLeft={scrolledLeft}
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
