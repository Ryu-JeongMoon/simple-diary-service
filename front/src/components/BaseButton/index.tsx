import React from 'react';

import { ButtonComplete } from './styled';

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
