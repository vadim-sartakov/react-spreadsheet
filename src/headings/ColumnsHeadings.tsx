import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { GridScrollerContainer, ScrollData, useScroller, renderCells } from '@vadim-sartakov/react-scroller';
import { HeadingMeta } from '../types';
import Heading from './Heading';

export interface ColumnsHeadingsProps {
  overscroll: number;
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

const rowsScrollData = { offset: 0, visibleIndexes: [0] };

const ColumnsHeadings: React.VFC<ColumnsHeadingsProps> = ({
  scrollerContainerRef,
  overscroll,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData,
  scrolledTop,
}) => {
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
  } = useScroller({
    scrollerContainerRef,
    defaultRowHeight: columnHeadingHeight,
    defaultColumnWidth,
    totalRows: 1,
    totalColumns,
    columnsSizes,
    overscroll,
    rowsScrollData,
    columnsScrollData,
    gridLayout: true,
  });

  const elements = renderCells({
    value: [columns],
    defaultRowHeight: columnHeadingHeight,
    defaultColumnWidth,
    columnsSizes,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    CellComponent: Heading,
    cellComponentProps: {
      type: 'column',
      defaultSize: defaultColumnWidth,
      sizes: columnsSizes,
      onSizesChange: onColumnsSizesChange,
    },
    RowComponent: React.Fragment,
  });

  return (
    <GridScrollerContainer
      className={`columns-headings last-row${scrolledTop ? ' scrolled-row' : ''}`}
      onScroll={onScroll}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default ColumnsHeadings;
