import * as React from 'react';
import useResizer from './useResizer';
import { ResizerProps } from './types';

const Resizer: React.VFC<ResizerProps> = ({
  type,
  index,
  defaultSize,
  sizes,
  onSizesChange,
}) => {
  const { handleMouseDown } = useResizer({
    type,
    index,
    defaultSize,
    sizes,
    onSizesChange,
  });
  return (
    <div
      className={`heading-resizer ${type}`}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Resizer;
