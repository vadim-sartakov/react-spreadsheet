import React, { useCallback, useRef, useEffect } from 'react'

const propertiesMap = {
  row: {
    coordinate: 'clientY'
  },
  column: {
    coordinate: 'clientX'
  }
};

const defaultArray = [];

const Resizer = ({ type, index, defaultSize, sizes = defaultArray, onSizesChange }) => {
  const interactionRef = useRef();

  const handleMouseDown = useCallback(event => {
    event.persist();
    event.stopPropagation();
    const startSize = sizes[index] || defaultSize;
    interactionRef.current = {
      startCoordinate: event[propertiesMap[type].coordinate],
      startSize
    };
  }, [type, index, defaultSize, sizes]);

  useEffect(() => {
    const handleMouseMove = event => {
      const interaction = interactionRef.current;
      if (!interaction) return;
      const diff = event[propertiesMap[type].coordinate] - interaction.startCoordinate;
      const nextSize = interaction.startSize + diff;
      onSizesChange(sizes => {
        const nextSizes = [...sizes];
        nextSizes[index] = nextSize;
        return nextSizes;
      });
    };

    const handleMouseUp = () => {
      interactionRef.current = undefined;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [type, index, onSizesChange]);

  return <div className={`heading-resizer ${type}`} onMouseDown={handleMouseDown} />;
};

export default Resizer;