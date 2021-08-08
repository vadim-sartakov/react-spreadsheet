import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { ListScroller, ScrollData } from '@vadim-sartakov/react-scroller';
import Heading from './Heading';
import { HeadingMeta } from '../types';

export interface RowsHeadingsProps {
  overscroll: number;
  hideRowsHeadings: boolean;
  rowHeadingWidth?: number;
  rowsSizes: number[];
  onRowsSizesChange: Dispatch<SetStateAction<number[]>>;
  defaultRowHeight: number;
  rows: HeadingMeta[];
  totalRows: number;
  rowsScrollData: ScrollData;
  scrolledLeft: boolean;
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
}

const RowsHeadings: React.VFC<RowsHeadingsProps> = ({
  scrollerContainerRef,
  overscroll,
  hideRowsHeadings,
  rowHeadingWidth = 40,
  rowsSizes,
  onRowsSizesChange,
  defaultRowHeight,
  rows,
  totalRows,
  rowsScrollData,
  scrolledLeft,
}) => (
  hideRowsHeadings ? null : (
    <ListScroller
      resizerContainerRef={scrollerContainerRef}
      RowComponent={Heading}
      rowComponentProps={{
        type: 'row',
        defaultSize: defaultRowHeight,
        sizes: rowsSizes,
        onSizesChange: onRowsSizesChange,
      }}
      visibleAreaProps={{
        style: { width: '100%' },
      }}
      value={rows}
      width={rowHeadingWidth}
      rowsSizes={rowsSizes}
      scrollerContainerProps={{
        className: `rows-headings last-column${scrolledLeft ? ' scrolled-column' : ''}`,
      }}
      overscroll={overscroll}
      totalRows={totalRows}
      defaultRowHeight={defaultRowHeight}
      rowsScrollData={rowsScrollData}
    />
  )
);

export default RowsHeadings;
