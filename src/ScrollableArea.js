import React, { forwardRef, useCallback } from 'react';
import SpreadsheetCell from './SpreadsheetCell';
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';

const ScrollableArea = forwardRef((inputProps, ref) => {
  const { onScroll: onScrollProp } = inputProps;
  const scrollerProps = useScroller({ ...inputProps, scrollerContainerRef: ref });

  const {
    scrollerContainerRef,
    scrollAreaStyle,
    visibleAreaStyle,
    fixedArea,
    onScroll,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    CellComponent,
    ...resultProps
  } = { ...inputProps, ...scrollerProps };

  const handleScroll = useCallback(event => {
    onScroll(event);
    onScrollProp(event);
  }, [onScroll, onScrollProp]);

  const renderCells = ({ rowIndex, visibleColumnsIndexes }) => {
    return visibleColumnsIndexes.map(columnIndex => (
      <SpreadsheetCell
          key={columnIndex}
          Component={CellComponent}
          rowIndex={rowIndex}
          columnIndex={columnIndex} />
    ));
  };

  const renderRows = visibleRowsIndexes => {
    return visibleRowsIndexes.map(rowIndex => (
      <div key={rowIndex} className="row">
        {renderCells({ rowIndex, visibleColumnsIndexes })}
      </div>
    ))
  };

  const containerStyle = fixedArea && { overflow: 'hidden' };

  return (
    <ScrollerContainer
        {...resultProps}
        ref={scrollerContainerRef}
        style={containerStyle}
        onScroll={handleScroll}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {renderRows(visibleRowsIndexes)}
        </div>
      </div>
    </ScrollerContainer>
  );
});

export default ScrollableArea;