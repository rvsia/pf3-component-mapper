import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, HelpBlock, Checkbox, Radio as PfRadio, Col, FormGroup } from 'patternfly-react';
import ReactSelect from 'react-select';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { validationError } from './helpers';
import MultipleChoiceList from './multiple-choice-list';
import customStyles from './select-styles';

const selectValue = option => option.sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })).map(item => item.value);

const selectComponent = ({
  componentType,
  input,
  options,
  isReadOnly,
  isDisabled,
  invalid,
  placeholder,
  isRequired,
  label,
  isSearchable,
  FieldProvider,
  ...rest
}) => ({
  [componentTypes.TEXT_FIELD]: () => <FormControl { ...input } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } />,
  [componentTypes.TEXTAREA_FIELD]: () =>
    <FormControl { ...input } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } componentClass="textarea" />,
  [componentTypes.CHECKBOX]: () => <Checkbox { ...input }>{ label }</Checkbox>,
  [componentTypes.RADIO]: () => options.map(option => (
    <FieldProvider
      key={ `${input.name}-${option.value}` }
      name={ input.name }
      value={ option.value }
      type="radio"
      render={ ({ input }) => (
        <PfRadio { ...input } onChange={ () => { input.onChange(option.value); } }>{ option.label }</PfRadio>) }
    />
  )),
  [componentTypes.SELECT_COMPONENT]: () => (
    <ReactSelect
      className={ `final-form-select ${invalid ? 'has-error' : ''}` }
      styles={ customStyles }
      { ...input }
      options={options.filter(option => option.hasOwnProperty('value') && option.value !== null)} // eslint-disable-line
      placeholder={ placeholder || 'Please choose' }
      value={ options.filter(({ value }) => rest.multi ? input.value.includes(value) : value === input.value) }
      isMulti={ rest.multi }
      isSearchable={ !!isSearchable }
      isClearable={ false }
      hideSelectedOptions={ false }
      closeMenuOnSelect={ !rest.multi }
      noOptionsMessage={ () => 'No option found' }
      onChange={ option =>
        input.onChange(rest.multi ? selectValue(option) : option ? option.value : undefined) } // eslint-disable-line no-nested-ternary
      { ...rest }
    />),
})[componentType];

const renderHelperText = (error, helperText) => (error // eslint-disable-line no-nested-ternary
  ? <HelpBlock>{ error }</HelpBlock>
  : helperText ? <HelpBlock>{ helperText }</HelpBlock> : null);

const FinalFormField = ({
  meta,
  validateOnMount,
  label,
  helperText,
  description,
  hideLabel,
  isVisible,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={ invalid ? 'error' : null }>
      { label &&
          <Col md={ hideLabel ? 0 : 2 } componentClass="label" className="control-label">
            { !hideLabel && label }
          </Col> }
      <Col md={ !label ? 12 : 10 }>
        { selectComponent({ ...rest, invalid, label })() }
        { description && <HelpBlock style={{ color: '#767676' }}>{ description }</HelpBlock> }
        { renderHelperText(invalid && meta.error, helperText) }
      </Col>
    </FormGroup>
  );
};

FinalFormField.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
  isVisible: PropTypes.bool,
};

const CheckboxGroupField = ({ options, ...rest }) =>
  (options ? <MultipleChoiceList options={ options } { ...rest } />
    : (
      <FinalFormField { ...rest }/>
    ));

const fieldMapper = type => ({
  [componentTypes.RADIO]: FinalFormField,
  [componentTypes.CHECKBOX]: props => <CheckboxGroupField { ...props } />,
  [componentTypes.SELECT_COMPONENT]: FinalFormField,
  [componentTypes.TEXTAREA_FIELD]: FinalFormField,
  [componentTypes.TEXT_FIELD]: FinalFormField,
  [componentTypes.SUB_FORM]: props => <div>Sub form</div>,
})[type];

const FieldInterface = ({
  dataType,
  condition,
  componentType,
  initialKey,
  ...props
}) => (
  fieldMapper(componentType)({
    ...props,
    componentType,
    id: props.id || props.name,
  })
);

FieldInterface.propTypes = {
  meta: PropTypes.object,
  condition: PropTypes.shape({
    when: PropTypes.string.isRequired,
    is: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]).isRequired,
  }),
  validate: PropTypes.oneOfType([ PropTypes.array, PropTypes.func ]),
  componentType: PropTypes.oneOf([
    componentTypes.RADIO,
    componentTypes.CHECKBOX,
    componentTypes.SELECT_COMPONENT,
    componentTypes.TEXTAREA_FIELD,
    componentTypes.TEXT_FIELD,
    componentTypes.SUB_FORM,
  ]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  dataType: PropTypes.any,
  initialKey: PropTypes.any,
};

export const TextField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXT_FIELD } />;
export const TextareaField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXTAREA_FIELD } />;
export const SelectField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.SELECT_COMPONENT } />;
export const Radio = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.RADIO } />;
export const CheckboxGroup = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.CHECKBOX } />;
export const SubForm = props => <FieldInterface { ...props } componentType={ componentTypes.SUB_FORM } />;
