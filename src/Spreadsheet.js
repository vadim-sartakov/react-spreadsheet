import React from 'react';
import Scroller, { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';
import useSpreadsheet from './useSpreadsheet';
import SpreadsheetCell from './SpreadsheetCell';
import Heading from './Heading';

const ColumnsHeadings = ({
  hideHeadings,
  columnsHeadingsValue,
  columnHeadingHeight,
  columnsSizes,
  defaultColumnWidth,
  totalColumns,
  columnsScrollData
}) => {
  return !hideHeadings && (
    <Scroller
        CellComponent={Heading}
        cellComponentProps={{ mode: 'column' }}
        rowComponentProps={{ className: 'row' }}
        value={columnsHeadingsValue}
        height={columnHeadingHeight}
        columnsSizes={columnsSizes}
        style={{ overflow: 'hidden', position: 'sticky', top: 0 }}
        overscroll={2}
        totalRows={1}
        totalColumns={totalColumns}
        defaultColumnWidth={defaultColumnWidth}
        defaultRowHeight={columnHeadingHeight}
        columnsScrollData={columnsScrollData} />
  )
};

const Spreadsheet = inputProps => {
  const spreadsheetProps = useSpreadsheet(inputProps);
  let props = { ...inputProps, ...spreadsheetProps };
  const scrollerProps = useScroller({ ...props, value: props.cells });
  props = { ...props, ...scrollerProps };

  const {
    scrollerContainerRef,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    scrollAreaStyle,
    visibleAreaStyle,
    noGrid,
    cells,
    CellComponent
  } = props;

  const resultClassName = `spreadsheet${noGrid ? ' no-grid' : ''}`;

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
          {valueElements}
        </div>
      </div>
    </ScrollerContainer>
  );
};

export default Spreadsheet;