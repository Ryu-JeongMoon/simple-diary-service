import { ButtonComplete } from './styled';
import React from 'react';

export const BaseButton = ({ isComplete, children, htmlType, ...props }) => {
  return (
    <ButtonComplete
      disabled={!isComplete}
      htmlType={htmlType}
      isComplete={isComplete}
      type='primary'
      {...props}>
      {children}
    </ButtonComplete>
  );
};
