import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Card from '../../Components/cards/card';
import { TitlesTop } from '../../Components/titles/titlesTop';


export default class MisGrupos extends Component {
    constructor() {
        super();
        this.state = {
            data2: [
                { nombreGrupo: 'Jillian aaa', categoriaGrupo: 'bici', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Jimmy aaa', categoriaGrupo: 'moto', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure" },
            ]
        }
    }

    misGrupos() {
        return (this.state.data2.map((e, i) =>
            <Card key={i} color="#59b548"
                name={e.nombreGrupo} category={e.categoriaGrupo}
                cantPersons={e.cantPers} description={e.descripcion}
            />
        ));
    }

    render() {
        return (
            <View style={styles.content} >
                <TitlesTop title='MIS GRUPOS' txtColor='#fff' borderRadius={12} bgColor='#FF8C01' widthSize='50%'/>
                <ScrollView style={styles.contentMyGroups}>
                    {this.misGrupos()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    contentMyGroups: {
        marginTop:12,
    }
});
