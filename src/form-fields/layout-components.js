import React from 'react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { Col, Row, FormGroup, Button, ButtonGroup, Icon, HelpBlock, Form } from 'patternfly-react';

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children, ...props }) => <Form { ...props } horizontal>{ children }</Form>,
  [layoutComponents.BUTTON]: ({ label, variant, ...props }) => <Button bsStyle={ variant } { ...props }>{ label }</Button>,
  [layoutComponents.COL]: ({ children, ...rest }) => <Col xs={ 12 } key={ rest.key || rest.name }>{ children }</Col>,
  [layoutComponents.FORM_GROUP]: FormGroup,
  [layoutComponents.BUTTON_GROUP]: ButtonGroup,
};

export default layoutMapper;
