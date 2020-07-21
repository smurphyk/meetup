import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberWrapper;
  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents />);
  });

  test('render NumberOfEvents div', () => {
    expect(NumberWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('render label', () => {
    expect(NumberWrapper.find('.Number-label')).toHaveLength(1);
  });

  test('render input span', () => {
    expect(NumberWrapper.find('.Number-input')).toHaveLength(1);
  });

  test('render input field', () => {
    expect(NumberWrapper.find('.Number-input-field')).toHaveLength(1);
  });

  test('change value in number-input-field', () => {
    const eventObject = { target: { value: 32 } };
    NumberWrapper.find('.Number-input-field').simulate('change', eventObject);
    expect(NumberWrapper.state('eventNumber')).toBe(32);
  });
});
