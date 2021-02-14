/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = props => {
  const { type, children } = props;
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};

export default Button;
