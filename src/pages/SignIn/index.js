import React, { useState } from 'react';
import {Text, TouchableOpacity, TextInput} from 'react-native';
import { Container, Logo,Input, BtnSignIn, TextButton } from './styles';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export function SignIn(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(false);

    const navigation = useNavigation();

    function handleLogin(){
        //checando se será cadastro ou login através do type
        if(type){

            //checa se todos os dados estão inseridos
            if(name ==='' || email ==='' || password ==='') {
                alert('Insira todos os dados para cadastro!')
            }

            auth() //acessa lib de autenticação
            .createUserWithEmailAndPassword(email, password)  //cria usuario através do email e senha (dos states)
            .then((user)=> { //caso de sucesso
                user.user.updateProfile({
                    displayName: name  //adiciona o Nome (dos states)
                }) 
                .then( () => {
                    navigation.goBack();  //Depois de cadastrado, volta uma tela do navigation (que dará acesso a pagina HOME (já configurado nas rotas))
                })
            })
            .catch( (error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                  }
              
                  console.error(error);
            })
        }
        //Se o usuario estiver com type = false (significa que irá logar)
        else{
            auth()
            .signInWithEmailAndPassword(email, password)
            .then( () => {
                navigation.goBack();
            })
            .catch( (error) => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                  }
              
                  console.error(error);
            })
        }
    }
 
    return(
        <Container>

            <Logo>HeyGroups</Logo>
            <Text style={{marginBottom: 16}}>Ajude, colabore, faça networking! </Text>
            {type && <Input placeholder='Qual seu nome?' value={name} onChangeText={(text) => setName(text)} placeholderTextColor="#c1c1c1"/> }
            
            <Input placeholder='Seu email' value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="#c1c1c1"/>
            <Input placeholder='Informe uma senha' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor="#c1c1c1"/>

            <BtnSignIn 
                style={{backgroundColor: type ? "#F53745" : "#57DD86"}}
                onPress={handleLogin} >
                <TextButton>{type ? "Cadastrar": "Acessar" }</TextButton>
            </BtnSignIn>
            <TouchableOpacity onPress={() => setType(!type)}>
                <Text style={{color: '#000'}}>{type ? "Já possuo uma conta" : "Criar uma nova conta"}</Text>
            </TouchableOpacity>
        </Container>
    )
}