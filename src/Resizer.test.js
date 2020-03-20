import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Resizer from './Resizer';

describe('useResize', () => {

  it('should increase column size', () => {
    const sizes = [50, 20];
    let result;
    const onSizesChange = setter => {
      result = setter(sizes);
    };
    const wrapper = mount(<Resizer type="column" index={0} sizes={sizes} onSizesChange={onSizesChange} />);
    wrapper.find('div').simulate('mousedown', { clientX: 0, clientY: 0 });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 10 }));
    });
    wrapper.update();
    expect(result).toEqual([70, 20]);
  });

  it('should decrease column size', () => {
    const sizes = [100, 30];
    let result;
    const onSizesChange = setter => {
      result = setter(sizes);
    };
    const wrapper = mount(<Resizer type="column" index={0} sizes={sizes} onSizesChange={onSizesChange} />);
    wrapper.find('div').simulate('mousedown', { clientX: 50, clientY: 50 });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 40 }));
    });
    wrapper.update();
    expect(result).toEqual([80, 30]);
  });

});