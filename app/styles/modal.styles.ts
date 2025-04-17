import styled from 'styled-components/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Wrapper = styled.View<{ visible: boolean }>`
display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;

export const Overlay = styled.View`
position: absolute;
top: 0;
left: 0;
width: ${width}px;
height: ${height}px;
background-color: rgba(0, 0, 0, 0.4);
z-index: 999;
`;

export const Card = styled.View`
position: absolute;
top: ${height / 2}px;
left: ${width / 2}px;
transform: translate(-${width / 2}px, -${height / 2}px);
background-color: #f3f3f3;
border-radius: 20px;
padding: 24px;
width: 90%;
max-width: 400px;
z-index: 1000;
display: flex;
flex-direction: column;
gap: 16px;
`;

export const Title = styled.Text`
  color: #333;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  padding: 12px 16px;
  gap: 8px;
`;

export const StyledInput = styled.TextInput.attrs(() => ({
    placeholderTextColor: '#999',
}))`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
`;

export const AddButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 12px 24px;
  background-color: #555;
  border-radius: 12px;
`;

export const AddButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const Icon = styled(FontAwesome6).attrs({
    size: 20,
    color: '#555',
})``;
