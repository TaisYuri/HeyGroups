import React, {useState, useEffect} from 'react';
import { Keyboard, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { Container, ContainerInput, Input, ButtonIcon } from './styles';
import { useIsFocused} from '@react-navigation/native';
import { ChatList } from '../../components/ChatList';

export function Search(){
    const isFocused = useIsFocused(); 
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect( () =>{
        const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
        setUser(hasUser)
    },[isFocused])

    //Busca no firebase todos as conversas pelo "NAME"
    async function handleSearch(){
        if(input === '') return

        const responseSearch = await firestore()
        .collection('MESSAGE_THREADS')
        .where('name', '>=', input)
        .where('name', '<=', input + '\uf8ff')
        .get()
        .then( (querySnapshot) => {
           
            const threads = querySnapshot.docs.map( documentSnap => {
                return{
                    _id:documentSnap.id,
                    name: '',
                    lastMessage: {text: ''},
                    ...documentSnap.data()
                }
            })

            setChats(threads);
            console.log(threads)
            setInput('');
            Keyboard.dismiss();
        })

    }

    return(
        <Container>
            <ContainerInput>
                <Input 
                    placeholder="Digite o nome da sala"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    autoCapitalize={'none'}
                    placeholderTextColor="#c1c1c1"
                />
                <ButtonIcon onPress={handleSearch}>
                    <MaterialIcons name='search' size={30} color='#FFF' />
                </ButtonIcon>
            </ContainerInput>

            <FlatList 
                data={chats}
                keyExtractor={ item => item._id}
                renderItem={ ({item}) =>  
                    <ChatList data={item} 
                       userStatus={user}  //verificar se o usuário está logado para ter acesso a conversa
                    />
                }
                showsVerticalScrollIndicator={false}
            />          


        </Container>
    )
}