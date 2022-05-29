import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: rgba(34,34,34, 0.4);
`;

export const AreaTouchable = styled.View`
    flex: 1;
    
`;

export const ModalContent = styled.View`
    flex: 1;
    background-color: #FFF;
    border-top-left-radius: 30px ;
    border-top-right-radius: 30px ;

`;

export const Content = styled.View`
   
`;

export const Title = styled.Text`
    font-size: 23px;
    font-weight: bold ;
    text-align: center;
    margin-top: 40px;
    color: #000; 
`;

export const Input = styled.TextInput`
    height: 50px;
    background-color: #d4d4d4;    
    font-size: 18px;
    padding: 10px;
    margin-top: 24px;
    margin-left:16px ;
    margin-right:16px ;
    border-radius: 6px;  
    color: #000;  
`;

export const Button = styled.TouchableOpacity`
    background-color: #2E54D4;  
    padding: 11px;
    margin-top: 15px;
    margin-left:16px ;
    margin-right:16px ;
    border-radius: 6px;    
    
`;

export const ButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold ;
    text-align: center;
    color: #FFF
`;

