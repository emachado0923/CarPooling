import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Col } from "react-native-easy-grid";
import { TitlesTop } from '../../../Components/titles/titlesTop';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from '../../../Components/common';



export default class CrearGrupo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TitlesTop title='CREA UN NUEVO GRUPO' bgColor='#FF8C01' txtColor='#fff' />
                <ScrollView>
                    <Col style={styles.contInfo}>
                        <Text style={styles.info}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim nisi vel eveniet dicta voluptas pariatur quia odit doloribus eos eum consectetur distinctio eligendi quas esse delectus laboriosam explicabo, quo dolore!
                        </Text>
                    </Col>
                    <Col style={styles.contInputs}>
                        <Input
                            label='Nombre'
                            labelSize={22}
                            labelColor='#00AA37'
                            borderBottomColor='#00AA37'
                            fontInputSize={20}
                            placeholder='Ingresa el nombre del grupo'
                        />
                        <Input
                            label='Sector de inicio'
                            labelSize={22}
                            labelColor='#00AA37'
                            borderBottomColor='#00AA37'
                            fontInputSize={20}
                            placeholder='Ingresa el sector de inicio de viajes'
                        />
                        <Input
                            label='Destino'
                            labelSize={22}
                            labelColor='#00AA37'
                            borderBottomColor='#00AA37'
                            fontInputSize={20}
                            placeholder='Ingresa el destino al que va el viaje'
                        />
                    </Col>
                    <Col style={styles.contBtn}>
                        <Button
                            widthSize='50%'
                            title='Crear grupo'
                            bgColor='#00AA37'
                            colorText='#fff'
                            fontSize={20}
                            fontWeight='bold'

                        />
                    </Col>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contInfo:{
        marginVertical:16,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
    },
    info:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'bold'
    },
    contInputs: {
        paddingHorizontal: 20,
    },
    contBtn: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16,
    }
})