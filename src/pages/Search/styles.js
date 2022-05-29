import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFF;
`;

export const ContainerInput = styled.View`
    flex-direction: row;
    width: 100%;
    margin: 10px;
`;
export const Input = styled.TextInput`
    background-color: #ebebeb;
    width: 80%;
    height: 50px;
    border-radius: 9px;
    padding: 8px;
    color:#000;
`;
export const ButtonIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #2e54d4;
    width: 15%;
    margin-left: 5px;
    border-radius: 9px;
`;
