import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Card from '../../../Components/cards/card';
import {TitlesTop} from '../../../Components/titles/titlesTop';

export default class GruposTodos extends Component {
    constructor() {
        super();
        this.state = {
            data1: [
                { nombreGrupo: 'Devin aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dan aaa', categoriaGrupo: 'moto', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
            ],
        }
    }

    grupos() {
        return (this.state.data1.map((e, i) =>
            <Card key={i} color="#f09209" 
                name={e.nombreGrupo} category={e.categoriaGrupo}
                cantPersons={e.cantPers} description={e.descripcion}
            />
        ));
    }

    render() {
        return (
            <View style={styles.content} >
                <TitlesTop txtColor='#fff' title='GRUPOS SUGERIDOS' widthSize='70%' bgColor='#00AA37'/>
                <ScrollView style={styles.contentGroups}>
                    {this.grupos()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contentGroups:{
        marginTop:12
    }
});
