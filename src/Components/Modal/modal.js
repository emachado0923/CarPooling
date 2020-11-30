import React from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


export const ModalAlert = ({onPress, title, modalvisible, IconName, ErrorModal}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalvisible}
        >
            <View style={styles.centeredView}>
                <View style={{...styles.modalView, borderColor: ErrorModal}}>

                    <View style={{borderWidth: 2, borderRadius: 100, padding: 30, borderColor: ErrorModal}}>
                        <Icon name={IconName} color={ErrorModal} size={50}/>
                    </View>


                    <Text style={styles.modalText}>{title}</Text>


                    <TouchableHighlight
                        style={{...styles.openButton, backgroundColor: "#2196F3"}}
                        onPress={onPress}>
                        <Text style={styles.textStyle}>Cerrar</Text>
                    </TouchableHighlight>


                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 70,
        alignItems: "center",
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        elevation: 10,
        paddingHorizontal: 50
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        margin: 10,
        textAlign: "center",
        fontWeight: 'bold'
    }
});
