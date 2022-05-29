import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFF;
    align-items: center;
    padding-top: 80px;

`;

export const Logo = styled.Text`
    font-size: 32px ;
    font-weight: bold;
    color: #000;

`;

export const Input = styled.TextInput.attrs({

})`
    width: 90%;
    height: 50px;
    padding: 5px 15px;
    margin-bottom: 10px;
    background-color: rgba(0,0,0,0.1);
    border-radius: 9px;
    color: #000
`;


export const BtnSignIn = styled.TouchableOpacity`
    width: 90%;
    padding: 16px 8px;
    align-items: center;
    height: 60px;
    border-radius: 9px;
    margin-top: 10px;
    margin-bottom: 10px;
    
`;

export const TextButton = styled.Text`
    font-size: 20px ;
    color: #fff;
    text-align: center;
`;