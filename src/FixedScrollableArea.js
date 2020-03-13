import React from 'react';
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';

const FixedScrollableArea = inputProps => {
  const scrollerProps = useScroller(inputProps);
  const {
    scrollerContainerRef,
    scrollAreaStyle,
    visibleAreaStyle,
    fixedArea,
    onScroll,
    ...resultProps
  } = { ...inputProps, ...scrollerProps };
  const scrollerStyle = fixedArea && { overflow: 'hidden', position: 'absolute', top: 0, left: 0 };
  return (
    <ScrollerContainer {...resultProps} style={scrollerStyle}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>

        </div>
      </div>
    </ScrollerContainer>
  );
};

export default FixedScrollableArea;