import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Button} from "../common";


export const ModalGrupo = ({onPress, title, modalvisible, IconName, ErrorModal, onPress2, cupos, tipoGrupo, uri, cantidad, descripcion}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalvisible}
        >
            <View style={{backgroundColor: 'white', flex: 1, justifyContent: "flex-start"}}>
                <View style={{width: '90%', height: '100%', alignContent: 'center'}}>


                    <View style={{flexDirection: 'row', marginTop: 50, left: 15}}>
                        <Image source={{uri: uri}}
                               style={{
                                   width: 150,
                                   height: 150,
                                   borderColor: '#00AA37',
                                   borderRadius: 100,
                                   borderWidth: 1
                               }}/>
                        <Text style={{color: '#00AA37', fontSize: 40, marginTop: 40, left: 10}}>{title}</Text>
                        <Text style={{color: '#00AA37', fontSize: 30, marginTop: 80, right: 95}}>{tipoGrupo}</Text>
                    </View>
                    <View style={{marginTop: 30, left: 15}}>
                        <Text style={{color: '#00AA37', fontSize: 30, fontWeight: 'bold'}}>DESCRIPCIÓN</Text>
                        <Text style={{color: '#707070', fontSize: 15}}>{descripcion}</Text>
                        <Text style={{color: '#707070', fontSize: 15, marginTop: 20}}>Cantidad de
                            viajeros: {cantidad}/{cupos}</Text>
                        <View style={{flexDirection: 'row', marginTop: 40}}>
                            <Button
                                title='Enviar solicitud'
                                borderColor='#FF8C01'
                                borderWidth={2}
                                widthSize='60%'
                                bgColor={'#FF8C01'}
                                colorText={'white'}
                                left={40}
                                onPress={onPress2}
                            />
                            <Button
                                title='Cancelar'
                                borderColor='#FF8C01'
                                borderWidth={2}
                                widthSize='60%'
                                colorText={'#000'}
                                right={10}
                                onPress={onPress}
                            />
                        </View>
                    </View>

                </View>
            </View>

            <TouchableHighlight
                style={{backgroundColor: "#00AA37"}}
                onPress={onPress}>
                <Text style={{textAlign: 'center'}}>Volver</Text>
            </TouchableHighlight>
        </Modal>
    )


}
