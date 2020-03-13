import React, { useRef, useCallback } from 'react';
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';
import SpreadsheetCell from './SpreadsheetCell';

const Spreadsheet = inputProps => {
  const scrollerContainerRef = useRef();
  const scrollerProps = useScroller({ ...inputProps, value: inputProps.cells, scrollerContainerRef });

  const {
    scroller,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    CellComponent,
    ...resultProps
  } = { ...inputProps, ...scrollerProps };

  // Handle fixed areas scroll here
  const handleScroll = useCallback(event => {
    onScroll(event);
  }, [onScroll]);

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

  return (
    <ScrollerContainer
        {...resultProps}
        className="spreadsheet"
        ref={scrollerContainerRef}
        onScroll={handleScroll}
        value={inputProps.cells}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {renderRows(visibleRowsIndexes)}
        </div>
      </div>
    </ScrollerContainer>
  );
};

export default Spreadsheet;