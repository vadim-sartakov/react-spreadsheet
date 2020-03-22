import React from 'react';

const SpreadsheetCell = ({ InnerComponent, value, ...props }) => {
  return <InnerComponent cell={value} {...props} />;
};

export default SpreadsheetCell;