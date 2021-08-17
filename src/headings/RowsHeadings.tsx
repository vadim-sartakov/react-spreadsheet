import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { ListScrollerContainer, renderRows, useScroller, ScrollData } from '@vadim-sartakov/react-scroller';
import Heading from './Heading';
import { HeadingMeta } from '../types';

export interface RowsHeadingsProps {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  overscroll: number;
  rowHeadingWidth?: number;
  rowsSizes: number[];
  onRowsSizesChange: Dispatch<SetStateAction<number[]>>;
  defaultRowHeight: number;
  rows: HeadingMeta[];
  totalRows: number;
  rowsScrollData: ScrollData;
  scrolledLeft: boolean;
}

const RowsHeadings: React.VFC<RowsHeadingsProps> = ({
  scrollerContainerRef,
  overscroll,
  rowHeadingWidth = 40,
  rowsSizes,
  onRowsSizesChange,
  defaultRowHeight,
  rows,
  totalRows,
  rowsScrollData,
  scrolledLeft,
}) => {
  const {
    visibleRowsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
  } = useScroller({
    scrollerContainerRef,
    defaultRowHeight,
    defaultColumnWidth: rowHeadingWidth,
    totalRows,
    totalColumns: 1,
    rowsSizes,
    overscroll,
    rowsScrollData,
    gridLayout: true,
  });

  const elements = renderRows({
    value: rows,
    defaultRowHeight,
    rowsSizes,
    visibleRowsIndexes,
    RowComponent: Heading,
    rowComponentProps: {
      type: 'row',
      defaultSize: defaultRowHeight,
      sizes: rowsSizes,
      onSizesChange: onRowsSizesChange,
    },
  });

  return (
    <ListScrollerContainer
      className={`rows-headings last-column${scrolledLeft ? ' scrolled-column' : ''}`}
      onScroll={onScroll}
      width={rowHeadingWidth}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </ListScrollerContainer>
  );
};

export default RowsHeadings;
