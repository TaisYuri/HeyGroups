import styled from 'styled-components/native';

export const Container = styled.View`
   padding: 5px 10px;   
`;

export const BoxMessage = styled.View`
  border-radius: 10px;
  background-color: ${ (props) => props.isMyMessage ? "#DCF8C5": "#FFF" };
  padding: 12px 8px;
  margin-left: ${(props) => props.isMyMessage ? 50: 0}px;
  margin-right: ${(props) => props.isMyMessage ? 0: 50}px;
`;

export const Name = styled.Text`    
    color: #f53745;
    font-size: 15px;
    font-weight: bold;
    
`;
export const Message = styled.Text`    
    color: rgba(0,0,0,0.7);
`;


