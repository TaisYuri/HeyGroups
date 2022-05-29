import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    /* background-color: #FFF; */
`;

export const Input = styled.TextInput`    
    padding: 12px;
    max-height: 130px;
    min-height: 48px;
    color: #000;
`;

export const ContainerInput = styled.View`    
   flex-direction: row;
   align-items: flex-end;
   margin: 10px;
`;

export const MainContainerInput = styled.View`    
   flex: 1;
   margin-right: 10px;
   background-color:#FFF;
   border-radius: 25px;
`;
export const BoxIcon = styled.View`    
   background-color: #51c880;
   height: 48px;
   width: 48px;
   border-radius: 25px;
   justify-content: center;
   align-items: center;
`;