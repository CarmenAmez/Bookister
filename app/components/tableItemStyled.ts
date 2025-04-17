import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Row = styled.View`
  flex-direction: row;
  padding: 14px 10px;
  border-bottom-width: 1px;
  border-color: #dcdcdc;
  align-items: center;
`;

export const Cell = styled.Text`
  flex: 1;
  text-align: center;
  color: #555;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  flex: 1;
`;

export const IconButton = styled(TouchableOpacity)`
  padding: 4px;
`;
