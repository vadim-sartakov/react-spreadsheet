import React, { forwardRef } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import Heading from './Heading';

const RowsHeadings = forwardRef(({
  overscroll,
  hideRowsHeadings,
  rowHeadingWidth = 40,
  rowsSizes,
  onRowsSizesChange,
  defaultRowHeight,
  rows,
  totalRows,
  rowsScrollData,
  scrolledLeft
}, ref) => {
  return !hideRowsHeadings ? (
    <Scroller
      ref={ref}
      CellComponent={Heading}
      cellComponentProps={{
        type: 'row',
        defaultSize: defaultRowHeight,
        sizes: rowsSizes,
        onSizesChange: onRowsSizesChange
      }}
      rowComponentProps={{ className: 'row' }}
      value={rows}
      width={rowHeadingWidth}
      rowsSizes={rowsSizes}
      className={`rows-headings last-row${scrolledLeft ? ' scrolled' : ''}`}
      overscroll={overscroll}
      totalColumns={1}
      totalRows={totalRows}
      defaultColumnWidth={rowHeadingWidth}
      defaultRowHeight={defaultRowHeight}
      rowsScrollData={rowsScrollData} />
  ) : null
});

export default RowsHeadings;