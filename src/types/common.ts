import { Dispatch, SetStateAction } from 'react';
import { Style } from './styles';

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

export interface SpreadsheetDataProps<T> {
  cells?: Cell<T>[][];
  onCellsChange?: Dispatch<SetStateAction<Cell<T>[][]>>;
  /** If managing supposed to be by the upper component, passing value as a prop */
  rows?: HeadingMeta[];
  onRowsChange?: Dispatch<SetStateAction<HeadingMeta[]>>;
  columns?: HeadingMeta[];
  onColumnsChange?: Dispatch<SetStateAction<HeadingMeta[]>>;
}

export interface SpreadsheetScrollProps {
  overscroll?: number;
}

export interface SpreadsheetSizesProps {
  totalRows: number;
  totalColumns: number;
  defaultRowHeight: number;
  defaultColumnWidth: number;
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

export interface UseSpreadsheetProps<T> extends SpreadsheetDataProps<T>, SpreadsheetSizesProps {
  fixRows?: number;
  fixColumns?: number;
}
