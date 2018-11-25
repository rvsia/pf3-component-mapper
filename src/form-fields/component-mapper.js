import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { TextField, TextareaField, SelectField, CheckboxGroup, Radio } from './form-fields';
import SubForm from './sub-form';
import Tabs from './tabs';

const mapper = componentType => ({
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextareaField,
  [componentTypes.FIELD_ARRAY]: props => <div>field array</div>,
  [componentTypes.SELECT_COMPONENT]: SelectField,
  [componentTypes.FIXED_LIST]: props => <div>fixed list</div>,
  [componentTypes.CHECKBOX]: CheckboxGroup,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.TAB_ITEM]: props => <div>tab item</div>,
  [componentTypes.DATE_PICKER]: props => <div>date picker</div>,
  [componentTypes.TIME_PICKER]: props => <div>time picker</div>,
  [componentTypes.TAG_CONTROL]: props => <div>tag control</div>,
})[componentType];

export default mapper;
