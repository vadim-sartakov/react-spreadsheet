import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { GridScroller, ScrollData } from '@vadim-sartakov/react-scroller';
import { HeadingMeta } from '../types';
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
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
}

const ColumnsHeadings: React.VFC<ColumnsHeadingsProps> = ({
  scrollerContainerRef,
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
      resizerContainerRef={scrollerContainerRef}
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
      gridLayout
      height={columnHeadingHeight}
      columnsSizes={columnsSizes}
      scrollerContainerProps={{
        className: `columns-headings last-row${scrolledTop ? ' scrolled-row' : ''}`,
      }}
      overscroll={overscroll}
      rowsScrollData={{ offset: 0, visibleIndexes: [0] }}
      columnsScrollData={columnsScrollData}
    />
  )
);

export default ColumnsHeadings;
