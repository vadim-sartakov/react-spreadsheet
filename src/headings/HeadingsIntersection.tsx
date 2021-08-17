import * as React from 'react';

export interface HeadingsIntersectionProps {
  rowHeadingWidth: number;
  columnHeadingHeight: number;
}

const HeadingsIntersection: React.VFC<HeadingsIntersectionProps> = ({
  rowHeadingWidth,
  columnHeadingHeight,
}) => (
  <div
    className="heading-cell heading-intersection"
    style={{
      width: rowHeadingWidth,
      height: columnHeadingHeight,
    }}
  />
);

export default HeadingsIntersection;
