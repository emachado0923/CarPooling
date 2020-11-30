import React, {Component} from "react";
import {Grid, Col, Row} from "react-native-easy-grid";
import {View, Text, Image} from "react-native";

import {Button} from '../common/Button';
import {ScrollView} from "react-native-gesture-handler";


const Notification = ({infoView, img}) => {
    return (
        <Grid>
            <View style={{
                width: '100%',
                minWidth: '100%',
                height: '100%',
                minHeight: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
                position: 'absolute'
            }}/>
            <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    width: '90%',
                    minHeight: '75%',
                    paddingHorizontal: 12,
                    paddingVertical: 16,
                    borderRadius: 14,
                    backgroundColor: 'white',
                    zIndex: 1001,
                    opacity: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Row size={2}>
                        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                            <Image style={{height: '100%', resizeMode: 'contain'}} source={img}/>
                        </View>
                    </Row>
                    <Row style={{
                        flex: 0.5,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 12,
                        padding: 12,
                    }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            Titulo
                        </Text>
                        <Text style={{fontSize: 16, color: '#707070'}}>
                            Fecha
                        </Text>
                    </Row>
                    <Row style={{
                        flex: 3,
                        margin: 12,
                    }}>
                        <ScrollView>
                            <Text style={{fontSize: 16, textAlign: 'justify'}}>
                               Algo
                            </Text>
                        </ScrollView>
                    </Row>
                    <View style={{width: '100%', paddingVertical: 12, alignItems: 'center',}}>
                        <Button onPress={infoView} widthSize='60%' title='Aceptar' colorText='white' fontWeight='bold'
                                fontSize={20} bgColor='#00AA37'/>
                    </View>
                </View>
            </Row>
        </Grid>
    );
}

export default Notification;


// export default class Notification extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Grid>
//         <View style={Styles.body} />
//         <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
//           <View style={Styles.notification}>
//             <Row size={1.7}>
//               <View>
//               </View>
//             </Row>
//             <Row size={1}>
//               <Text>Titulo 1</Text>
//               <Text>Subtitulo</Text>
//             </Row>
//             <Row size={3}>
//               <Text>Parrafo</Text>
//             </Row>
//             <Button onPress={this.props.infoView} title={'Aceptar'} colorText='white' bgColor='#274fb2' colorBorder='#274fb2'></Button>
//           </View>
//         </Row>
//       </Grid>
//     );
//   }
// }

// const Styles = StyleSheet.create({
//   body: {
//     width: '100%',
//     minWidth: '100%',
//     height: '100%',
//     minHeight: '100%',
//     backgroundColor: 'black',
//     opacity: 0.5,
//     position: 'absolute'
//   },
//   notification: {
//     width: '85%',
//     height: '65%',
//     padding: '5%',
//     borderRadius: 14,
//     backgroundColor: 'white',
//     zIndex: 1001,
//     opacity: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
