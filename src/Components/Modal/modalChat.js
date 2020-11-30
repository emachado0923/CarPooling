import React from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import ChatView from "../../View/Grupos/Chat/chatView";


const ModalChat = ({onPress, IsVisible, Data}) => {
    return (
        <Modal
            visible={IsVisible}
            animationType="slide"
            transparent={false}>


            <ChatView grupo={Data}/>


            <TouchableHighlight
                style={{backgroundColor: "#2196F3"}}
                onPress={onPress}>
                <Text>&times;</Text>
            </TouchableHighlight>

        </Modal>
    )


}

export default ModalChat
