import React from "react";
import { Container, Message, Title } from "./styles";
import { useNavigation} from '@react-navigation/native'

export function ChatList({data, deleteRoom, userStatus}){
    const navigation = useNavigation();

    const openChat=() => {
        if(userStatus){
            navigation.navigate("Messages", {thread: data})
        }else{
            navigation.navigate("SignIn")
        }
    }

    return(
       <Container onPress={openChat} onLongPress={() => deleteRoom && deleteRoom()}>
           <Title>{data.name}</Title>
           <Message>{data.lastMessage.text}</Message>
       </Container> 
    )

}