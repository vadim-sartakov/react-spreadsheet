import React, { useRef, useCallback } from 'react';
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import ScrollableArea from './ScrollableArea';
import SpreadsheetCell from './SpreadsheetCell';

const Spreadsheet = inputProps => {
  const spreadsheetProps = useSpreadsheet(inputProps);

  const {
    width,
    height,
    noGrid,
    cells,
    CellComponent,
    ...resultProps
  } = { ...inputProps, ...spreadsheetProps };

  const handleScroll = useCallback(event => {
    
  }, []);

  const resultClassName = `spreadsheet${noGrid ? ' no-grid' : ''}`;

  return (
    <div style={{ width, height }} className={resultClassName}>
      <ScrollableArea
          CellComponent={CellComponent}
          value={cells}
          width="100%"
          height="100%"
          onScroll={handleScroll}
          {...resultProps} />
    </div>
  );
};

export default Spreadsheet;