import {
  Dispatch,
  SetStateAction,
} from 'react';
import { HeadingType } from '../types';

export interface ResizerProps {
  type: HeadingType;
  sizes?: number[];
  index: number;
  defaultSize: number;
  onSizesChange: Dispatch<SetStateAction<number[]>>;
}
