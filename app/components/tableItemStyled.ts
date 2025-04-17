// tableItemStyled.ts
import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #dcdcdc;
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
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 6px;
`;
