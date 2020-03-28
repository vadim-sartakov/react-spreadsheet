import React, { useMemo } from 'react';
import Scroller from '@vadim-sartakov/react-scroller';
import Heading from './Heading';

const ColumnsHeadings = ({
  overscroll,
  hideColumnsHeadings,
  columnHeadingHeight = 20,
  columnsSizes,
  onColumnsSizesChange,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData,
  scrolledTop
}) => {
  const columnsHeadingsValue = useMemo(() => [columns], [columns]);
  return hideColumnsHeadings ? null : (
    <Scroller
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
      className={`columns-headings last-row${scrolledTop ? ' scrolled-row' : ''}`}
      overscroll={overscroll}
      totalRows={1}
      totalColumns={totalColumns}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={columnHeadingHeight}
      columnsScrollData={columnsScrollData} />
  );
};

export default ColumnsHeadings;