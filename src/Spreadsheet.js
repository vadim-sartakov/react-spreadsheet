import React, { useRef, useCallback, useMemo } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import Heading from './Heading';

const Spreadsheet = inputProps => {
  const spreadsheetProps = useSpreadsheet(inputProps);

  const {
    width,
    height,
    hideHeadings,
    noGrid,
    cells,
    rowsSizes,
    columnsSizes,
    rows,
    columns,
    columnHeadingHeight = 20,
    //rowHeadingWidth = 120,
    CellComponent,
    ...resultProps
  } = { ...inputProps, ...spreadsheetProps };

  const resultClassName = `spreadsheet${noGrid ? ' no-grid' : ''}`;
  const specialRowsHeight = columnHeadingHeight;
  const columnsHeadingsValue = useMemo(() => [columns], [columns]);

  const columnsHeadingsRef = useRef();

  const handleScroll = useCallback(event => {
    columnsHeadingsRef.current.scrollLeft = event.target.scrollLeft;
  }, []);

  return (
    <div style={{ width, height }} className={resultClassName}>
      {!hideHeadings && (
        <Scroller
            ref={columnsHeadingsRef}
            CellComponent={Heading}
            cellComponentProps={{ mode: 'column' }}
            rowComponentProps={{ className: 'row' }}
            value={columnsHeadingsValue}
            width="100%"
            height={columnHeadingHeight}
            onScroll={handleScroll}
            columnsSizes={columnsSizes}
            style={{ overflow: 'hidden' }}
            {...resultProps}
            overscroll={2}
            totalRows={1}
            defaultRowHeight={columnHeadingHeight} />
      )}
      <Scroller
          CellComponent={CellComponent}
          rowComponentProps={{ className: 'row' }}
          value={cells}
          width="100%"
          height={`calc(100% - ${specialRowsHeight}px)`}
          onScroll={handleScroll}
          rowsSizes={rowsSizes}
          columnsSizes={columnsSizes}
          {...resultProps} />
    </div>
  );
};

export default Spreadsheet;