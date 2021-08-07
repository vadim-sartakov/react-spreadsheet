import React, { Dispatch, SetStateAction } from 'react';
import { HeadingMeta } from 'types';
import { GridScroller, ScrollData } from '@vadim-sartakov/react-scroller';
import Heading from './Heading';

export interface ColumnsHeadingsProps {
  overscroll: number;
  hideColumnsHeadings: boolean;
  columnHeadingHeight?: number;
  columnsSizes: number[];
  onColumnsSizesChange: Dispatch<SetStateAction<number[]>>;
  defaultColumnWidth: number;
  columns: HeadingMeta[];
  totalColumns: number;
  columnsScrollData: ScrollData;
  scrolledTop: boolean;
}

const ColumnsHeadings: React.VFC<ColumnsHeadingsProps> = ({
  overscroll,
  hideColumnsHeadings,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData,
  scrolledTop,
}) => (
  hideColumnsHeadings ? null : (
    <GridScroller
      value={[columns]}
      CellComponent={Heading}
      cellComponentProps={{
        type: 'column',
        defaultSize: defaultColumnWidth,
        sizes: columnsSizes,
        onSizesChange: onColumnsSizesChange,
      }}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={columnHeadingHeight}
      totalRows={1}
      totalColumns={totalColumns}
      rowComponentProps={{ className: 'row' }}
      height={columnHeadingHeight}
      columnsSizes={columnsSizes}
      scrollerContainerProps={{
        className: `columns-headings last-row${scrolledTop ? ' scrolled-row' : ''}`,
      }}
      overscroll={overscroll}
      columnsScrollData={columnsScrollData}
    />
  )
);

export default ColumnsHeadings;
