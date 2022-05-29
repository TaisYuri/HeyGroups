import React, {useState,useEffect} from 'react';
import {Text, Button, TouchableOpacity, Modal, FlatList, Alert} from 'react-native';
import{ useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Container, Groups, Header, Search, Title } from './styles';
import auth from '@react-native-firebase/auth'
import { FabButton } from '../../components/FabButton';
import { ModalNewRoom } from '../../components/ModalNewRoom';
import firestore from '@react-native-firebase/firestore'
import { ChatList } from '../../components/ChatList';

export function ChatRoom(){
    const navigation = useNavigation();
    const isFocused = useIsFocused(); //retorna true caso a tela estiver em foco.

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(null)
    const [updateScreen, setUpdateScreen]  = useState(false); //responsavel por atualizar o useEffect toda vez que o modal fechar (garante a atualização da busca do firebase)
    const [threads, setThreads] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const hasUser = auth().currentUser ? auth().currentUser.toJSON(): null; //checa se há usuario logado.
        setUser(hasUser)
     
    }, [isFocused])
    
    useEffect( ()=> {
        let isActive = true;

        function getChats(){
            firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('lastMessage.createdAt', 'desc')
            .limit(30)
            .get()
            .then( (snapshot)=> {
                const threads = snapshot.docs.map( documentSnapshot => {
                    return{
                        _id: documentSnapshot.id,
                        name: '',
                        lastMessage: {text: ''},
                        ...documentSnapshot.data()
                    }
                })
                if(isActive){
                    setThreads(threads)
                    setLoading(false)
                }
            })
        }

        getChats()

        //executado quando o componente é desmontado
        return()=> {
            isActive = false
        }

    }, [isFocused, updateScreen])

    function handleSignOut(){
        auth()
        .signOut()
        .then( ()=> {
            navigation.navigate('SignIn')
        })
        .catch( ()=> {
            alert('usuario não logado')
            
        })
    }

    function deleteRoom(ownerid, idRoom){
        //Verifica se o dono da sala === ao usuário logado
        if(ownerid !== user?.uid) return;

        Alert.alert(
            "Atenção!",
            "Você tem certeza que deseja deletar essa sala?",
            [
                { text: 'Cancel', onPress: ()=>{}, style: 'cancel'},
                { text: 'OK', onPress: ()=> handleDeleteRoom(idRoom), }
            ]
        )
    }

    async function handleDeleteRoom(idRoom){
        await firestore()
        .collection('MESSAGE_THREADS')
        .doc(idRoom)
        .delete();

        setUpdateScreen(!updateScreen)
    }


    return(
        <Container>
            <Header>
                <Groups>
                    {user && (
                        <TouchableOpacity onPress={handleSignOut} activeOpacity={0.9}>
                            <MaterialIcons name='arrow-back' size={28} color='#FFF'/>
                        </TouchableOpacity>
                    )}
                    <Title>Grupos</Title>
                </Groups>
                <Search onPress={() => navigation.navigate('Search')}>
                    <MaterialIcons name="search" size={28} color='#FFF'/>
                </Search>
            </Header>

            <FlatList 
                data={threads}
                keyExtractor={ item => item._id}
                renderItem={ ({item}) =>  
                    <ChatList data={item} 
                        deleteRoom={() => deleteRoom(item.owner, item._id)}
                        userStatus={user}  //verificar se o usuário está logado para ter acesso a conversa
                    />
                }
            />            


            <FabButton visible={() => setModalVisible(true)} userStatus={user}/>

            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <ModalNewRoom 
                visible={() => setModalVisible(false)} 
                updateScreenModal = {() => setUpdateScreen(!updateScreen)}/>
            </Modal>
          
        </Container>
    )
}