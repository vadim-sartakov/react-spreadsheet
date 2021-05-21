import React, { Dispatch, SetStateAction } from 'react';
import { HeadingMeta } from 'types';
import { GridScroller } from '@vadim-sartakov/react-scroller';
import { ScrollData } from '@vadim-sartakov/react-scroller/lib/types';
import Heading, { HeadingProps } from './Heading';

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
      value={columns}
      CellComponent={Heading}
      cellComponentProps={{
        type: 'column',
        defaultSize: defaultColumnWidth,
        sizes: columnsSizes,
        onSizesChange: onColumnsSizesChange,
      } as HeadingProps}
      rowComponentProps={{ className: 'row' }}
      height={columnHeadingHeight}
      columnsSizes={columnsSizes}
      className={`columns-headings last-row${scrolledTop ? ' scrolled-row' : ''}`}
      overscroll={overscroll}
      totalRows={1}
      totalColumns={totalColumns}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={columnHeadingHeight}
      columnsScrollData={columnsScrollData}
    />
  )
);

export default ColumnsHeadings;
