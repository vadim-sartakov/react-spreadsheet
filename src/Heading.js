import React from 'react';

const Heading = ({ value, mode, style }) => {
  let className;
  if (mode === 'row') {
    className = 'row-heading';
  } else if (mode === 'column') {
    className = 'column-heading';
  }
  return (
    <div className={`heading-cell ${className}`} style={style}>
      {value.key + 1}
    </div>
  );
};

export default Heading;