import React from 'react';

import PropTypes from 'prop-types';

import { StyledDiv } from './styled';

export const Div = props => {
  return <StyledDiv {...props} />;
};

Div.propTypes = {
  props: PropTypes.object,
};
