import React from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


export const ModalForm = ({onPress, Title, modalvisible, IconName, ErrorModal, Form}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalvisible}
        >
            <View style={styles.centeredView}>

                <View style={{...styles.modalView, borderColor: ErrorModal}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 5,

                    }}>
                        <Text style={styles.modalText}>
                            <Icon name={IconName} color={ErrorModal} size={25}/>
                            &nbsp;{Title}
                        </Text>


                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={onPress}>
                            <Text style={styles.textStyle}>&times;</Text>
                        </TouchableHighlight>

                    </View>

                    <View style={{marginTop: 10}}>
                        {Form}
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
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
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
        borderRadius: 100,
        padding: 5,
        elevation: 10,
        paddingHorizontal: 15,
        left: 190,
        bottom: 15,
        position: 'absolute',

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25
    },
    modalText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
        right: 20,

    }
});
