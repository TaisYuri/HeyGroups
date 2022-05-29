import React,{useState} from "react";
import { TouchableWithoutFeedback, Text} from "react-native";
import { AreaTouchable, Button, ButtonText, Container, Content, Input, ModalContent, Title } from "./styles";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';


export function ModalNewRoom( {visible, updateScreenModal}) {
    const [room, setRoom] = useState('');
    const user = auth().currentUser.toJSON();

    function handleButtonCreate(){
        if(room === '') return;


        //Deixar apenas cada usuario criar 4 grupos
        firestore().collection('MESSAGE_THREADS')
        .get()
        .then( (snapshoot) => {
            let myThreads = 0;

            snapshoot.docs.map( docItem =>{
                if(docItem.data().owner === user.uid){  //compara o usuario logado e soma +1
                    myThreads += 1;
                }
            })

            if(myThreads >= 4){
                alert("Você já atingiu o limite de grupos por usuário")
            }else{
                createRoom();
            }

        })

    }

    //cria nova sala no firestore
    function createRoom(){
        firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name: room,
            owner: user.uid,
            lastMessage: {
                text: `Grupo ${room} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(), //pega a data do banco de dados
            }
        })
        .then( (docRef)=> {
            docRef.collection('MESSAGES')
            .add({
                text:`Grupo ${room} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(), //pega a data do banco de dados
                system: true,
            })
           .then(() => {
               
               visible();
               updateScreenModal();
           })
        
        })
        .catch( (err)=> {
            console.log(err)
        })
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={visible}> 
                <AreaTouchable />
            </TouchableWithoutFeedback>

            <ModalContent>
                <Content>
                    <Title>Criar um novo Grupo?</Title>
                    <Input value={room} onChangeText={(text) => setRoom(text)} placeholderTextColor="#c1c1c1" placeholder='nome da sala'/>
                    <Button onPress={handleButtonCreate}>
                        <ButtonText>Criar sala</ButtonText>
                    </Button>
                        
                </Content>

            </ModalContent>
        </Container>
    )
}