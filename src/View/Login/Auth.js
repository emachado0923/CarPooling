import React, {Component} from "react";
import {View, Alert, Text, Image, Dimensions, Keyboard, Animated, StyleSheet} from "react-native";
import {Col, Row, Grid} from "react-native-easy-grid";
import LottieView from "lottie-react-native";
import anim from "../../resources/animations/backgraounds/wavesGreen.json";
import {Loading, Input, Button} from "../../Components/common";
import {ModalAlert} from '../../Components/Modal/modal';
import {API, URL_API} from "../../API/comunicacionApi";
import {connect} from "react-redux";
import {jwt, saveKey, user, cargando} from "../../redux/actions/services";
import {PanGestureHandler} from "react-native-gesture-handler";


var _touchX = new Animated.Value(10 / 2);
var _touchY = new Animated.Value(10 / 2);
var _touchy = 0;

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correo: "",
            contraseña: "",
            error: "",
            loading: false,
            prueba: false,
            windowWidth: 0,
            windowHeight: 0,
            ola: 0,
            keyboard: false,
            modalVisible: false,
            message: '',
            color: '',
            icon: ''
        };

        this.loginUser = this.loginUser.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.animation.play();
        let windowWidth = Dimensions.get("window").width;
        let windowHeight = Dimensions.get("window").height;

        this.setState({
            windowWidth,
            windowHeight
        });
        _touchX.setValue(0);

        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            this.setState({keyboard: true})
        );
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            this.setState({keyboard: false})
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    async loginUser() {
        const {correo, contraseña} = this.state;

        // NOTE Post to HTTPS only in production

        await API.POST(`/login`, {correo, contraseña})
            .then(({data}) => {
                this.setState({loading: true});
                this.props.services_loading(true);
                if (data.ok) {
                    this.props.saveJWT("token", data.token);
                    this.props.actualizar_jwt(data.token);
                    this.props.update_user(data.login[0]);
                }
            })
            .catch((e) => {

                this.setState({
                    modalVisible: true,
                    message: e.response.data.error,
                    color: 'red',
                    icon: 'times'
                })

            });
        this.props.services_loading(false);

    }

    desacerError() {
        setTimeout(() => {
            this.setState({
                error: ''
            });
        }, 3000);
    }

    onLoginFail() {
        Alert("Login Failed");
        this.setState({
            loading: false
        });
    }

    handle() {
        let windowHeight = Dimensions.get("window").height;
        let deviceHeight = -(windowHeight / 2)
        if (deviceHeight >= _touchY._value) {
            console.log("Mayor");
            this.setState({
                ola: -windowHeight / 4 * 3,
            });


        } else {
            this.setState({
                ola: 0,
            });
        }

    }

    _onPanGestureEvent = Animated.event(
        [{nativeEvent: {y: _touchY}}],
        {listener: this.handle.bind(this)},
    )

    presss() {
        console.log("presiona");

    }

    render() {
        const {error, loading, keyboard, ola, modalVisible} = this.state;

        const {errorTextStyle, containerStyle} = styles;
        const imageHeight1 = {width: 100, height: 100, resizeMode: "cover"};
        const imageHeight2 = {width: 150, height: 150, resizeMode: "cover"};

        return (
            <Grid>
                <Row>
                    <Col size={1}>
                        <View style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            minHeight: "75%",
                            paddingTop: 20
                        }}>
                            <View>
                                <Image
                                    source={require("../../resources/img/LogoSENA-naranja_vector.png")}
                                    style={keyboard ? imageHeight1 : imageHeight2}
                                />
                            </View>
                            <View>
                                <View style={styles.contInputs}>
                                    <Input
                                        label={"Correo Electrónico"}
                                        onChangeText={correo => this.setState({correo})}
                                        placeholder="Ingrese su correo misena"
                                        style={{width: "85%", color: "green"}}
                                    />
                                    <Input
                                        label={"Contraseña"}
                                        secureTextEntry
                                        onChangeText={contraseña => this.setState({contraseña})}
                                        placeholder="Ingrese su contraseña"
                                    />
                                </View>

                                <Text style={styles.errorTextStyle}>{error}</Text>


                                <View style={{
                                    minHeight: 80,
                                    alignItems: "center",
                                    justifyContent: 'space-between'
                                }}>
                                    {!loading ? (

                                        <Button
                                            title="Ingresar"
                                            onPress={this.loginUser}
                                            colorText='#fff'
                                            bgColor="#FF8C01"
                                            fontSize={16}
                                        />
                                    ) : (
                                        <Loading size={"large"}/>
                                    )}
                                    <Button
                                        title="Registrarse"
                                        onPress={() => this.props.navigation.navigate("Register")}
                                        bgColor='#00AA37'
                                        colorText='#fff'
                                        fontSize={16}
                                    />
                                </View>
                            </View>
                        </View>

                        <ModalAlert
                            modalvisible={modalVisible}
                            title={this.state.message}
                            IconName={this.state.icon}
                            ErrorModal={this.state.color}
                            onPress={() => {
                                this.setModalVisible(!modalVisible)

                            }}
                        />

                        <Row>
                            <PanGestureHandler onGestureEvent={this._onPanGestureEvent} onPress={this.presss}>
                                <Animated.View
                                    style={{
                                        flex: 1,
                                    }}
                                >

                                    <Animated.View
                                        style={[{
                                            zIndex: 1000,
                                        },
                                            {
                                                transform: [
                                                    {
                                                        translateX: Animated.add(
                                                            _touchX,
                                                            new Animated.Value(0)
                                                        )
                                                    },
                                                    {
                                                        translateY: Animated.add(
                                                            ola || _touchY,
                                                            new Animated.Value(0)
                                                        )
                                                    }
                                                ]
                                            }
                                        ]}
                                    >

                                        <LottieView
                                            ref={animation => {
                                                this.animation = animation
                                            }}
                                            style={{
                                                width: '100%',
                                            }}
                                            loop={true}
                                            source={anim}
                                        />
                                    </Animated.View>

                                </Animated.View>
                            </PanGestureHandler>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }


}

const styles = StyleSheet.create({
    containerStyle: {
        height: 40,
        flex: 1,
        alignItems: "center",
    },
    contInputs: {
        width: '90%',
        paddingHorizontal: 12,
    },
    errorTextStyle: {
        alignSelf: "center",
        fontSize: 18,
        color: "red"
    }
});

const mapStateToProps = state => {
    return {
        jwt: state.services.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actualizar_jwt: est => dispatch(jwt(est)),
        saveJWT: (key, value) => dispatch(saveKey(key, value)),
        update_user: person => dispatch(user(person)),
        services_loading: loguear => dispatch(cargando(loguear))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
