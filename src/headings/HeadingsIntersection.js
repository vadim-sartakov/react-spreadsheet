import React from 'react';

const HeadingsIntersection = ({ hideHeadings, rowHeadingWidth, columnHeadingHeight }) => {
  return !hideHeadings && (
    <div
      className="heading-cell heading-intersection"
      style={{
        width: rowHeadingWidth,
        height: columnHeadingHeight
      }} />
  );
};

export default HeadingsIntersection;