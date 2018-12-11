import React from 'react';
import toJson from 'enzyme-to-json';
import { SwitchField } from '../form-fields/form-fields';
import Switch from '../form-fields/switch-field';
import { mount } from 'enzyme';

const FieldProvider = ({ render, ...props }) => <div>{ render({ input: { name: 'Foo', onChange: jest.fn() }, meta: { error: false, touched: false }, ...props }) }</div>;

describe('FormFields', () => {
  const props = {
    input: {
      name: 'Name of the field',
      value: '',
    },
    id: 'someIdKey',
    dataType: 'someDataType',
    meta: {
      error: false,
      touched: false,
    },
  };

  it('should render Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch with label correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } label={ 'Label' } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch with placeholder correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } placeholder={ 'Placeholder' } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch with labelText correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } labelText={ 'labelText' } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch with onText (custom prop) correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } onText={ 'OnText' } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } isDisabled FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render readOnly Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } isReadOnly FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render small Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } bsSize='mini' FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render sm Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } bsSize='mn' FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
