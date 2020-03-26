import { Dispatch, SetStateAction, MutableRefObject, CSSProperties } from 'react';
import { ScrollData } from '@vadim-sartakov/react-scroller';

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

export interface Meta {
  type?: 'NUMBER' | 'GROUP';
  /** Width or height */
  size?: number;
  /** Whether current element expanded or collapsed */
  hidden?: number;
  /** Group level */
  level?: number,
  style?: Style
}
export interface Cell {
  /** Value itself */
  value: any;
  /** 
   * Format callback which accepts value and should return react element
   * It could also be a string
   */
  format?: (value: any) => JSX.Element;
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

export interface CellAddress {
  row: number;
  column: number;
}

export interface CellsRange {
  start: CellAddress;
  end: CellAddress;
}

export interface UseSpreadsheetOptions {
  defaultCells?: Cell[][];
  cells?: Cell[][];
  onCellsChange?: Dispatch<SetStateAction<Cell[][]>>;
  /** Default value for internal state management */
  defaultRows?: Meta[];
  /** If managing supposed to be by the upper component, passing value as prop */
  rows?: Meta[];
  onRowsChange?: Dispatch<SetStateAction<Meta[]>>;
  defaultColumns?: Meta[];
  columns?: Meta[];
  onColumnsChange?: Dispatch<SetStateAction<Meta[]>>;
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
  fixRows?: number;
  fixColumns?: number;
}

export interface UseSpreadsheetResult {
  scrollerContainerRef: MutableRefObject<Element>;
  rowsScrollData: ScrollData;
  onRowsScrollDataChange: Dispatch<SetStateAction<ScrollData>>;
  columnsScrollData: ScrollData;
  onColumnsScrollDataChange: Dispatch<SetStateAction<ScrollData>>;
  onScroll: UIEvent;
  selectedCells?: CellsRange[];
  onSelectedCellsChange?: Dispatch<SetStateAction<CellsRange[]>>;
  rowsSizes: number[];
  columnsSizes: number[];
  onRowsSizesChange: Dispatch<SetStateAction<number[]>>;
  onColumnsSizesChange: Dispatch<SetStateAction<number[]>>;
  specialRowsSize: number;
  specialColumnsSize: number;
  /** Whether container has been scrolled top */
  scrolledTop: boolean;
  /** Whether container has been scrolled left */
  scrolledLeft: boolean;
  fixedRowsSize: number;
  fixedColumnsSize: number;
  containerStyle: CSSProperties;
}

export declare function useSpreadsheet(options: UseSpreadsheetOptions): UseSpreadsheetResult

export interface SpreadsheetProps extends UseSpreadsheetOptions {
  width?: number | string;
  height: number | string;
  
  /**
   * If set to 'true' then special 'no-grid' class will be appended to root.
   * If default style imported, then grid will be hidden.
   */
  noGrid?: boolean;
  mergedCells?: CellsRange[];
}