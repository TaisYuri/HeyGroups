import React, {useMemo} from "react";
import { Container, Message, BoxMessage, Name, Input } from "./styles";

import auth from '@react-native-firebase/auth'

export function ChatMessage({data}){

    const user = auth().currentUser.toJSON();

    const isMyMessage = useMemo(() =>{
        return data?.user?._id === user.uid
    }, [data]) 

    return(
       <Container >
           <BoxMessage isMyMessage={isMyMessage}>
                {!isMyMessage && <Name>{data?.user?.displayName}</Name>}
                <Message >{data.text}</Message>
           </BoxMessage>

          
       </Container> 
    )

}