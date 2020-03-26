import React, { useMemo, forwardRef } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import Heading from './Heading';

const ColumnsHeadings = forwardRef(({
  overscroll,
  hideHeadings,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData,
  scrolledTop
}, ref) => {
  const columnsHeadingsValue = useMemo(() => [columns], [columns]);
  return !hideHeadings && (
    <Scroller
      ref={ref}
      CellComponent={Heading}
      cellComponentProps={{
        type: 'column',
        defaultSize: defaultColumnWidth,
        sizes: columnsSizes,
        onSizesChange: onColumnsSizesChange
      }}
      rowComponentProps={{ className: 'row' }}
      value={columnsHeadingsValue}
      height={columnHeadingHeight}
      columnsSizes={columnsSizes}
      className={`columns-headings${scrolledTop ? ' last-row' : ''}`}
      overscroll={overscroll}
      totalRows={1}
      totalColumns={totalColumns}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={columnHeadingHeight}
      columnsScrollData={columnsScrollData} />
  )
});

export default ColumnsHeadings;