import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import Card from '../../Components/cards/card';
import Title from '../../Components/titles/titles';

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
                <Title colorBorder="#59b548" colorBg="#fff" colorText="#238276" title="mis grupos" />
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
    grupos: {
        marginTop: 10,
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#59b548",
        backgroundColor: "#59b548",
        padding: 10,
        fontSize: 20,
        maxWidth: 150,
        width: 150,
        color: "#fff",
        marginBottom: 10,
        textAlign: "center"
    },
    misgrupos: {
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#59b548",
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 20,
        maxWidth: 150,
        width: 150,
        color: "#238276",
        marginBottom: 10,
        textAlign: "center"
    },
    contentGroups: {
        flex: 1,
    },
    contentMyGroups: {
        flex: 1
    }
});
