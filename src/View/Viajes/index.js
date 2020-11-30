import React, {Component} from "react";
import {View, StyleSheet, Text, Picker} from "react-native";
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Grid, Col, Row} from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome5";

MapboxGL.setAccessToken('pk.eyJ1Ijoic2VyZ2lvYWNnMjAiLCJhIjoiY2tmZm83ejViMDBzMTJydGR6YTRoZnk4bSJ9.CBNpQkocgudzt9VgYxmJ1w');
//Components
import Select from '../../Components/Forms/Select';
import {Button} from "../../Components/common";


const Marker = ({coordinate, id, color, label}) => {
    return (

        <MapboxGL.MarkerView coordinate={coordinate} id={'1'}>
            <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,

            }}>
                <View>
                    <Text><Icon name={'map-marker-alt'} size={25} color={'#b71e1e'}/></Text>
                </View>
            </View>
        </MapboxGL.MarkerView>
    );
};

const data = [
    {dato: 'dato 1', id: 1},
    {dato: 'dato 2', id: 2}


]

export default class Viajes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            showUserLocation: true,
            location: [-122.084990, 37.426929],
            texto: [-0, 0],
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: 42.430472,
                longitude: -123.334102,
                zoom: 16
            },

            userLocation: [-0, 0]
        }


    }

    SeleccionarSede = () => {

        console.log(this.state.userLocation)
        this.setState({
            texto: this.state.userLocation
        })
    }

    render() {
        return (
            <Grid>
                <Row style={styles.container}>
                    <View style={styles.subContainer}>
                        <Select borderColor={'#00AA37'} array={data} label={'nara'} title='Origen del viaje'></Select>
                        <View style={{marginVertical: 12,}}>

                            <Text style={styles.tittleSelect}>Tipo de
                                Vehiculo</Text>
                            <Row style={styles.rowStyle}>

                                <Picker selectedValue={this.state.userLocation}
                                        onValueChange={(itemValue) =>
                                            this.setState({userLocation: itemValue})
                                        }
                                        style={{width: '100%'}} mode={'dropdown'}>

                                    <Picker.Item color={'#808080'} label={'Seleccionar:'}
                                                 value={0}/>
                                    <Picker.Item color={'#808080'} label={'Sena Central'}
                                                 value={[-75.5749899, 6.2545757]}/>
                                    <Picker.Item color={'#808080'} label={'Sena Pedregal'}
                                                 value={[-75.5687861, 6.3013742]}/>


                                </Picker>
                            </Row>
                        </View>

                        <Button
                            title='Buscar'
                            borderColor='#FF8C01'
                            borderWidth={2}
                            widthSize='60%'
                            bgColor={'#FF8C01'}
                            colorText={'white'}
                            margin={5}
                            onPress={() => this.SeleccionarSede()}
                        />
                    </View>
                </Row>
                <Row style={styles.contMap}>


                    <MapboxGL.MapView
                        style={{width: '100%'}}
                        styleURL={MapboxGL.StyleURL.Street}
                        showUserLocation={true}
                        onPress={(texto) => {
                            this.setState({texto: texto.geometry.coordinates})
                            console.log(texto.geometry.coordinates)
                            console.log(texto.geometry)
                        }}>



                        <MapboxGL.Camera
                            zoomLevel={17}
                            animationMode={'flyTo'}
                            animationDuration={6000}
                            centerCoordinate={this.state.userLocation}
                        />

                        <Marker
                            color={'#22732d'}
                            coordinate={this.state.texto}
                        />


                        <MapboxGL.UserLocation visible={true} animated={true} renderMode={'normal'}/>

                    </MapboxGL.MapView>
                </Row>
                <Row style={styles.subContainer2}>
                    <Col style={styles.contImg}>
                        <View style={styles.imgConduc}/>
                    </Col>
                    <Col style={styles.contInfo}>
                        <Text>
                            {this.state.texto}
                        </Text>
                        <View style={styles.contBtns}>
                            <Button
                                title='Text'
                                borderColor='#00AA37'
                                borderWidth={2}
                                widthSize='60%'
                            />
                            <Button
                                title='Text'
                                borderColor='#FF8C01'
                                borderWidth={2}
                                widthSize='60%'
                            />
                        </View>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#FF8C01',
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subContainer: {
        backgroundColor: '#F0F0F0',
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 12,
        marginBottom: 12,
    },
    contMap: {
        flex: 3,
        height: 100,
        backgroundColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainer2: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
        padding: 12,
        marginTop: -8
    },
    contImg: {
        width: '40%',
        alignItems: 'center',
    },
    imgConduc: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#00AA37'
    },
    contInfo: {
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contBtns: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4
    },
    tittleSelect: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: 12,
        margin: 5

    },
    rowStyle: {
        height: 45,
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#00AA37',
        borderRadius: 15,

    },

})
