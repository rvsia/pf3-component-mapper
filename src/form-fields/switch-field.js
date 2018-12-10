import React from 'react';
import PropTypes from 'prop-types';
import './switch-field.scss';

const Switch = ({ onText, offText, disabled, isReadOnly, ...props }) => (
  <label className={ `pf3-switch${disabled || isReadOnly ? ' disabled' : ''}` }>
    <input type="checkbox" { ...props } disabled={ disabled || isReadOnly } />
    <span className={ `pf3-switch-slider${props.checked ? ' checked' : ''}` }>
      <span className="on-text">
        { onText }
      </span>
      <span className="divider" />
      <span className="off-text">
        { offText }
      </span>
    </span>
  </label>
);

Switch.propTypes = {
  onText: PropTypes.string,
  offText: PropTypes.string,
  disabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  checked: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  onText: 'ON',
  offText: 'OFF',
};

export default Switch;
