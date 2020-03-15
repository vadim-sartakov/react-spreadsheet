import React, { useMemo, useState } from 'react';
import Scroller, { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import SpreadsheetCell from './SpreadsheetCell';
import Heading from './Heading';

const ColumnsHeadings = ({
  overscroll,
  hideHeadings,
  columnHeadingHeight = 20,
  columnsSizes,
  defaultColumnWidth,
  columns,
  totalColumns,
  columnsScrollData
}) => {
  const columnsHeadingsValue = useMemo(() => [columns], [columns]);
  return !hideHeadings && (
    <Scroller
        CellComponent={Heading}
        cellComponentProps={{ mode: 'column' }}
        rowComponentProps={{ className: 'row' }}
        value={columnsHeadingsValue}
        height={columnHeadingHeight}
        columnsSizes={columnsSizes}
        style={{ overflow: 'hidden', position: 'sticky', top: 0 }}
        overscroll={overscroll}
        totalRows={1}
        totalColumns={totalColumns}
        defaultColumnWidth={defaultColumnWidth}
        defaultRowHeight={columnHeadingHeight}
        columnsScrollData={columnsScrollData}
        staticContainer />
  )
};

const Spreadsheet = inputProps => {
  const [columnsScrollData, onColumnsScrollDataChange] = useState();
  
  const spreadsheetProps = useSpreadsheet(inputProps);
  let props = { ...inputProps, ...spreadsheetProps };
  const scrollerProps = useScroller({ ...props, value: props.cells, columnsScrollData, onColumnsScrollDataChange });
  props = { ...props, ...scrollerProps };

  const {
    scrollerContainerRef,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    scrollAreaStyle,
    visibleAreaStyle,
    hideHeadings,
    noGrid,
    cells,
    columnsSizes,
    columns,
    columnHeadingHeight,
    totalColumns,
    defaultColumnWidth,
    overscroll,
    CellComponent
  } = props;

  const resultClassName = `spreadsheet${noGrid ? ' no-grid' : ''}`;

  const columnsHeadings = (
    <ColumnsHeadings
        columns={columns}
        columnHeadingHeight={columnHeadingHeight}
        totalColumns={totalColumns}
        columnsSizes={columnsSizes}
        defaultColumnWidth={defaultColumnWidth}
        hideHeadings={hideHeadings}
        columnsScrollData={columnsScrollData}
        overscroll={overscroll} />
  );

  const valueElements = visibleRowsIndexes.map(rowIndex => {
    const columnsElements = visibleColumnsIndexes.map(columnIndex => {
      return <SpreadsheetCell key={columnIndex} Component={CellComponent} rowIndex={rowIndex} columnIndex={columnIndex} />
    });
    return <div key={rowIndex} className="row">{columnsElements}</div>;
  });

  return (
    <ScrollerContainer
        ref={scrollerContainerRef}
        className={resultClassName}
        value={cells}
        {...props}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {columnsHeadings}
          {valueElements}
        </div>
      </div>
    </ScrollerContainer>
  );
};

export default Spreadsheet;