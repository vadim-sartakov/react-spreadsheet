import { Dispatch, SetStateAction } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HeadingType } from '../types';
import Resizer from './Resizer';

describe('useResize', () => {
  it('should increase column size', () => {
    const sizes = [50, 20];
    let result;
    const onSizesChange: Dispatch<SetStateAction<number[]>> = setter => {
      result = typeof setter === 'function' && setter(sizes);
    };
    const { container } = render(
      <Resizer
        type={HeadingType.Column}
        index={0}
        sizes={sizes}
        defaultSize={20}
        onSizesChange={onSizesChange}
      />,
    );
    fireEvent.mouseDown(container.querySelector('.column'), { clientX: 0, clientY: 0 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 10 }));
    expect(result).toEqual([70, 20]);
  });

  it('should decrease column size', () => {
    const sizes = [100, 30];
    let result;
    const onSizesChange: Dispatch<SetStateAction<number[]>> = setter => {
      result = typeof setter === 'function' && setter(sizes);
    };
    const { container } = render(
      <Resizer
        type={HeadingType.Column}
        index={0}
        defaultSize={20}
        sizes={sizes}
        onSizesChange={onSizesChange}
      />,
    );
    fireEvent.mouseDown(container.querySelector('.column'), { clientX: 50, clientY: 50 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 40 }));
    expect(result).toEqual([80, 30]);
  });
});
