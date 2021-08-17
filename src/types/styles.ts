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
