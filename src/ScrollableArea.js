import React from 'react';
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';

const ScrollableArea = inputProps => {
  const scrollerProps = useScroller(inputProps);
  const {
    scrollerContainerRef,
    scrollAreaStyle,
    visibleAreaStyle,
    fixedArea,
    ...resultProps
  } = { ...inputProps, ...scrollerProps };
  const scrollerStyle = fixedArea && { overflow: 'hidden' };
  return (
    <ScrollerContainer {...resultProps} style={scrollerStyle}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>

        </div>
      </div>
    </ScrollerContainer>
  );
};

export default ScrollableArea;