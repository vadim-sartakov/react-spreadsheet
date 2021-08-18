import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { GridScrollerContainer, renderCells } from '@vadim-sartakov/react-scroller';
import { HeadingMeta } from '../types';
import Heading from './Heading';

export interface ColumnsHeadingsProps {
  columnHeadingHeight?: number;
  columnsSizes: number[];
  onColumnsSizesChange: Dispatch<SetStateAction<number[]>>;
  defaultColumnWidth: number;
  columns: HeadingMeta[];
  scrolledTop: boolean;
  visibleColumnsIndexes: number[];
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const ColumnsHeadings: React.VFC<ColumnsHeadingsProps> = ({
  visibleColumnsIndexes,
  scrollAreaStyle,
  visibleAreaStyle,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  scrolledTop,
}) => {
  const elements = renderCells({
    value: [columns],
    defaultRowHeight: columnHeadingHeight,
    defaultColumnWidth,
    columnsSizes,
    visibleRowsIndexes: [0],
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
    >
      <div
        style={{
          ...scrollAreaStyle,
          height: columnHeadingHeight,
        }}
      >
        <div
          style={{
            ...visibleAreaStyle,
            gridTemplateRows: `${columnHeadingHeight}px`,
            top: 0,
          }}
        >
          {elements}
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default ColumnsHeadings;
