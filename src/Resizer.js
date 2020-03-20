import React, { useCallback, useRef, useEffect } from 'react'

const Resizer = ({ className, startSizes, onResize }) => {
  const interactionRef = useRef();

  const handleMouseDown = useCallback(event => {
    event.persist();
    event.stopPropagation();
    interactionRef.current = {
      startCoordinates: { x: event.clientX, y: event.clientY },
      startSizes
    };
  }, [startSizes]);

  useEffect(() => {
    const handleMouseMove = event => {
      const interaction = interactionRef.current;
      if (!interaction) return;
      const diffX = event.clientX - interaction.startCoordinates.x;
      const diffY = event.clientY - interaction.startCoordinates.y;

      let nextWidth = interaction.startSizes.width + diffX;
      let nextHeight = interaction.startSizes.height + diffY;

      const nextSizes = {
        width: nextWidth,
        height: nextHeight
      };
      onResize(nextSizes);
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
  }, [onResize]);

  return <div className={`heading-resizer${className ? ` ${className}` : ''}`} onMouseDown={handleMouseDown} />;
};

export default Resizer;