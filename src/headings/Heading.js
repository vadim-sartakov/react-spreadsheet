import React from 'react';
import Resizer from '../Resizer';

const Heading = ({ value, type, rowIndex, columnIndex, style, sizes, defaultSize, onSizesChange }) => {
  let className, index;
  if (type === 'row') {
    className = 'row-heading';
    index = rowIndex;
  } else if (type === 'column') {
    className = 'column-heading';
    index = columnIndex;
  }
  return (
    <div className={`heading-cell ${className}`} style={style}>
      {value.key + 1}
      <Resizer type={type} index={index} defaultSize={defaultSize} sizes={sizes} onSizesChange={onSizesChange} />
    </div>
  );
};

export default Heading;