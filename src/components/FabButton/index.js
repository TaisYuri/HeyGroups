import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'


export function FabButton({visible, userStatus}){
    const navigation = useNavigation();

    return(
        //userStatus verifica se o usuario está logado, caso esteja abre o modal. Caso contrario, direciona para a pagina de login.
        <TouchableOpacity style={style.container} onPress={() => userStatus ? visible() : navigation.navigate("SignIn")} >
            <Feather name='plus' color={'#fff'} size={25} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container:{
        position: 'absolute' ,
        right: '6%',
        bottom: '5%',
        zIndex: 1 ,
        padding: 17,
        backgroundColor: '#2E54D4',
        borderRadius: 32,
        
    },
})