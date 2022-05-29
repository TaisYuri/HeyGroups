import React, {useEffect, useState} from 'react';
import {Platform, FlatList, KeyboardAvoidingView, SafeAreaView, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'
import { ChatMessage } from '../../components/ChatMessage';
import { BoxIcon, ContainerInput, Input, MainContainerInput } from './styles';


export function Messages( {route} ){

    const { thread } = route.params;
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');

    const user = auth().currentUser.toJSON();

    //lista todas as mensagens e aloca no state Messages
    useEffect( () => {
        const unsubscribeListener = firestore().collection("MESSAGE_THREADS")
        .doc(thread._id)  //id da sala clicada
        .collection('MESSAGES')
        .orderBy('createdAt','desc') //ordena por ordem de criação
        .onSnapshot( querySnapshoot => {
            const messages = querySnapshoot.docs.map( doc => {   //percorrerar todas as "messages" via map
                const firebaseData = doc.data()

                const data = {
                    _id: doc.id,
                    text: '',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    ...firebaseData
                }

                //Checará se a msg foi enviada pelo sistema. Caso não, acrescentará o nome do autor.
                if(!firebaseData.system){
                    data.user = {
                        ...firebaseData.user,
                        name: firebaseData.user.displayName
                    }
                }

                return data;
            })
            setMessages(messages)

            //desmontando o componente para não ficar monitorando quando o usuário sai da pagina.
            return () => unsubscribeListener();
        })
    }, []);

    async function handleSend(){
        //checa se Input possui informação para ser salvo.
        if(textInput === '') return;

        //Adiciona mensagem vinda do input
        await firestore().collection('MESSAGE_THREADS')
        .doc(thread._id)  //id da sala clicada
        .collection('MESSAGES')
        .add({
            text: textInput,
            createdAt: firestore.FieldValue.serverTimestamp(),
            user: {
                _id: user.uid,
                displayName: user.displayName
            }
        })

        //Atualiza a lastMessage do MESSAGE_THREADS
        await firestore().collection('MESSAGE_THREADS')
        .doc(thread._id)  //id da sala clicada
        .set({  //atualiza dados
            lastMessage:{
                text: textInput,
                createdAt: firestore.FieldValue.serverTimestamp(),
            },
        },{ merge: true }  //mergea com o que possui para não substuituir todos os dados por apenas o que estão sendo enviados.
        )

        setTextInput('');
    }

    return(
        <SafeAreaView style={{flex: 1}}>       
            <FlatList 
                data={messages}
                renderItem={ ({item}) => <ChatMessage data={item} />}
                keyExtractor = { item => item._id}
                style={{width: '100%'}}
                inverted={true} //inverte a ordem da lista
            />

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding": "height"}
                keyboardVerticalOffset={100}
                style={{width: '100%'}}
            >
                <ContainerInput>
                    <MainContainerInput>
                        <Input 
                            placeholder='Digite sua mensagem'
                            value={textInput}
                            onChangeText = { (text) => setTextInput(text)}
                            multiline={true}
                            placeholderTextColor="#c1c1c1"
                        />
                    </MainContainerInput>
                    <TouchableOpacity onPress={handleSend}>
                        <BoxIcon>
                            <Feather name='send' size={22} color={"#FFF"}/>
                        </BoxIcon>
                    </TouchableOpacity>
                </ContainerInput>
            </KeyboardAvoidingView>



        </SafeAreaView>
    )
}