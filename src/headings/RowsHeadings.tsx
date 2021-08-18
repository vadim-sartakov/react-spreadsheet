import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { ListScrollerContainer, renderRows } from '@vadim-sartakov/react-scroller';
import Heading from './Heading';
import { HeadingMeta } from '../types';

export interface RowsHeadingsProps {
  rowHeadingWidth?: number;
  rowsSizes: number[];
  onRowsSizesChange: Dispatch<SetStateAction<number[]>>;
  defaultRowHeight: number;
  rows: HeadingMeta[];
  scrolledLeft: boolean;
  visibleRowsIndexes: number[];
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const RowsHeadings: React.VFC<RowsHeadingsProps> = ({
  visibleRowsIndexes,
  scrollAreaStyle,
  visibleAreaStyle,
  rowHeadingWidth = 40,
  rowsSizes,
  onRowsSizesChange,
  defaultRowHeight,
  rows,
  scrolledLeft,
}) => {
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
      width={rowHeadingWidth}
    >
      <div
        style={{
          ...scrollAreaStyle,
          width: rowHeadingWidth,
        }}
      >
        <div
          style={{
            ...visibleAreaStyle,
            gridTemplateColumns: `${rowHeadingWidth}px`,
            left: 0,
          }}
        >
          {elements}
        </div>
      </div>
    </ListScrollerContainer>
  );
};

export default RowsHeadings;
