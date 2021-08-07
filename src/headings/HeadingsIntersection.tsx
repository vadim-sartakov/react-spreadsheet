import React from 'react';

export interface HeadingsIntersectionProps {
  hideRowsHeadings: boolean;
  hideColumnsHeadings: boolean;
  rowHeadingWidth: number;
  columnHeadingHeight: number;
}

const HeadingsIntersection: React.VFC<HeadingsIntersectionProps> = ({
  hideRowsHeadings,
  hideColumnsHeadings,
  rowHeadingWidth,
  columnHeadingHeight,
}) => (
  hideRowsHeadings || hideColumnsHeadings ? null : (
    <div
      className="heading-cell heading-intersection"
      style={{
        width: rowHeadingWidth,
        height: columnHeadingHeight,
      }}
    />
  )
);

export default HeadingsIntersection;
