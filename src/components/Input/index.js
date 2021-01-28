import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
  background-color: #171B35;
  border: 1px solid #6200EE;
  border-radius: 3.5px;
  color: #FFFFFF;
  font-size: 14px;
  letter-spacing: 0.15px;
  line-height: 24px;
  width: 100%;
  height: 40px;
  margin-top: 15px;
`;

const Input = ({ onChange, placeholder, ...props }) => (
  <div>
    <InputBase
      onChange={onChange}
      placeholder={placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </div>
);

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Input;
