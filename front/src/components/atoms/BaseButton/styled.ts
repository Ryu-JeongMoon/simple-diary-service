import { Color } from '@styles/color';
import { lowerTypography } from '@styles/lowerTypography';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

export const ButtonComplete = styled(AntdButton)`
  display: block;
  margin-top: 16px;
  width: ${props => props.width || '100%'};
  height: 40px;
  color: ${Color.white};
  ${lowerTypography.button};
  ${props => (props.isComplete ? Color.primary : Color.secondary)};
`;
