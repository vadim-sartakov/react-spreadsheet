import React from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import Heading from './Heading';

const RowsHeadings = ({
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
}) => {
  return hideRowsHeadings ? null : (
    <Scroller
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
      className={`rows-headings last-column${scrolledLeft ? ' scrolled-column' : ''}`}
      overscroll={overscroll}
      totalColumns={1}
      totalRows={totalRows}
      defaultColumnWidth={rowHeadingWidth}
      defaultRowHeight={defaultRowHeight}
      rowsScrollData={rowsScrollData} />
  );
};

export default RowsHeadings;