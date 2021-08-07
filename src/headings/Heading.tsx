import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { GridScrollerCellRenderProps } from '@vadim-sartakov/react-scroller';
import { HeadingType, HeadingMeta } from '../types';
import Resizer from '../Resizer';

export interface HeadingProps extends GridScrollerCellRenderProps<HeadingMeta> {
  type: HeadingType;
  defaultSize: number;
  sizes: number[];
  onSizesChange: Dispatch<SetStateAction<number[]>>;
}

const classesMap = {
  [HeadingType.Row]: 'row-heading',
  [HeadingType.Column]: 'column-heading',
};

const Heading: React.VFC<HeadingProps> = ({
  value,
  style,
  type,
  rowIndex,
  columnIndex,
  sizes,
  defaultSize,
  onSizesChange,
}) => {
  let index: number;

  if (type === HeadingType.Row) index = rowIndex;
  if (type === HeadingType.Column) index = columnIndex;

  return (
    <div
      className={`heading-cell ${classesMap[type]}`}
      style={style}
    >
      {value.index + 1}
      <Resizer
        type={type}
        index={index}
        defaultSize={defaultSize}
        sizes={sizes}
        onSizesChange={onSizesChange}
      />
    </div>
  );
};

export default Heading;
