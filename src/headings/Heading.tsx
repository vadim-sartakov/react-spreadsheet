import React, { Dispatch, SetStateAction } from 'react';
import { HeadingType, HeadingMeta } from 'types';
import Resizer from '../Resizer';

export interface HeadingProps {
  meta: HeadingMeta,
  type: HeadingType;
  index: number;
  defaultSize: number;
  sizes: number[];
  onSizesChange: Dispatch<SetStateAction<number[]>>;
}

const classesMap = {
  [HeadingType.Row]: 'row-heading',
  [HeadingType.Column]: 'column-heading',
};

const Heading: React.VFC<HeadingProps> = ({
  meta,
  type,
  index,
  sizes,
  defaultSize,
  onSizesChange,
}) => (
  <div className={`heading-cell ${classesMap[type]}`}>
    {meta.index + 1}
    <Resizer
      type={type}
      index={index}
      defaultSize={defaultSize}
      sizes={sizes}
      onSizesChange={onSizesChange}
    />
  </div>
);

export default Heading;
