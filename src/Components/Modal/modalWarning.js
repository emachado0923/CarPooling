import React from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Grid, Col, Row} from 'react-native-easy-grid'


export const ModalWarning = ({onPress,handleSubmit, title, modalvisible, IconName, ErrorModal}) => {
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

                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={handleSubmit}>
                            <Text style={styles.textStyle}>Eliminar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={onPress}>
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>

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
        padding: 55,
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
        padding: 10,
        elevation: 10,
        paddingHorizontal: 20,
        margin: 4
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
