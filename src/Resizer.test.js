import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Resizer from './Resizer';

describe('useResize', () => {

  it('should increase sizes', () => {
    const onResize = jest.fn();
    const wrapper = mount(<Resizer startSizes={{ width: 50, height: 10 }} onResize={onResize} />);
    wrapper.find('div').simulate('mousedown', { clientX: 0, clientY: 0 });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 10 }));
    });
    wrapper.update();
    expect(onResize.mock.calls[0][0]).toEqual({ width: 70, height: 20 });
  });

  it('should decrease sizes', () => {
    const onResize = jest.fn();
    const wrapper = mount(<Resizer startSizes={{ width: 100, height: 80 }} onResize={onResize} />);
    wrapper.find('div').simulate('mousedown', { clientX: 50, clientY: 50 });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 40 }));
    });
    wrapper.update();
    expect(onResize.mock.calls[0][0]).toEqual({ width: 80, height: 70 });
  });

});