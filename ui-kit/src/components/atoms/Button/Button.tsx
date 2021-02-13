/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = props => {
  const { type, children } = props;
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};
