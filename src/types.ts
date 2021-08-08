import React, { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { ScrollData } from '@vadim-sartakov/react-scroller';

export enum HeadingType {
  Row = 'row',
  Column = 'column',
}

export interface CellAddress {
  row: number;
  column: number;
}

export interface CellsRange {
  start: CellAddress;
  end: CellAddress;
}

export interface Font {
  name?: string;
  size?: number;
  bold: boolean;
  italic: boolean;
  color: string;
}

export interface BorderStyle {
  style: 'thin' | 'medium' | 'thick' ;
  color: string;
}

export interface Borders {
  top?: BorderStyle;
  left?: BorderStyle;
  bottom?: BorderStyle;
  right?: BorderStyle;
}

export interface Style {
  verticalAlign: 'top' | 'middle' | 'bottom';
  horizontalAlign: 'left' | 'center' | 'right';
  font: Font;
  border?: Borders;
  fill?: string;
  wrapText?: boolean;
}

export interface HeadingMeta {
  type?: 'NUMBER' | 'GROUP';
  index: number;
  /** Width or height */
  size?: number;
  /** Whether current element expanded or collapsed */
  hidden?: number;
  /** Group level */
  level?: number;
  style?: Style;
}

export interface Cell<T> {
  value: T;
  /**
   * Format callback which accepts value and should return react element
   * It could also be a string
   */
  format?: (value: T) => JSX.Element;
  /** Excel like formula */
  formula?: string;
  style?: Style;
}

/** Group object describing grouped items range */
export interface Group {
  start: number;
  /** Inclusive */
  end: number;
  /** Origin group start with offset caused by hidden items */
  offsetStart?: number;
  /** Origin group end with offset caused by hidden items */
  offsetEnd?: number;
  collapsed?: boolean;
}

export interface SpreadsheetViewProps {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  rowsScrollData?: ScrollData;
  columnsScrollData?: ScrollData;
  rows: HeadingMeta[];
  columns: HeadingMeta[];
  defaultRowHeight: number;
  defaultColumnWidth: number;
  totalRows: number;
  totalColumns: number;
  rowsSizes: number[];
  onRowsSizesChange: Dispatch<SetStateAction<number[]>>;
  columnsSizes: number[];
  onColumnsSizesChange: Dispatch<SetStateAction<number[]>>;
  rowHeadingWidth: number;
  columnHeadingHeight: number;
  hideRowsHeadings?: boolean;
  hideColumnsHeadings?: boolean;
  overscroll: number;
  scrolledTop?: boolean;
  scrolledLeft?: boolean;
}

export interface SpreadsheetPropsBase<T> {
  ref?: MutableRefObject<HTMLDivElement>;
  defaultCells?: Cell<T>[][];
  cells?: Cell<T>[][];
  onCellsChange?: Dispatch<SetStateAction<Cell<T>[][]>>;
  /** Default value for internal state management */
  defaultRows?: HeadingMeta[];
  /** If managing supposed to be by the upper component, passing value as a prop */
  rows?: HeadingMeta[];
  onRowsChange?: Dispatch<SetStateAction<HeadingMeta[]>>;
  defaultColumns?: HeadingMeta[];
  columns?: HeadingMeta[];
  onColumnsChange?: Dispatch<SetStateAction<HeadingMeta[]>>;
  totalRows: number;
  totalColumns: number;
  defaultRowHeight: number;
  defaultColumnWidth: number;
  fixRows?: number;
  fixColumns?: number;
  /** If set to 'true' then rows/columns headings won't be rendered */
  hideHeadings?: boolean;
  /** Height of special row with column numbers. Default is 20 */
  columnHeadingHeight?: number;
  /** Width of special column with row numbers. Default is 120 */
  rowHeadingWidth?: number;
  /**
   * Width and height of groups special rows and columns.
   * These areas serve for group buttons rendering and group lines.
   */
  groupSize?: number;
}
