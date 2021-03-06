import React from 'react';

const HeadingsIntersection = ({ hideRowsHeadings, hideColumnsHeadings, rowHeadingWidth, columnHeadingHeight }) => {
  return hideRowsHeadings || hideColumnsHeadings ? null : (
    <div
      className="heading-cell heading-intersection"
      style={{
        width: rowHeadingWidth,
        height: columnHeadingHeight
      }} />
  );
};

export default HeadingsIntersection;