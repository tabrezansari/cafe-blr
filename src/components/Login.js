import React, { Component } from 'react';
import { StyleSheet, image, View, Alert, Image, AppRegistry, TouchableOpacity, AsyncStorage } from 'react-native';
import {
    Container,
    Input, Item, Title, Body, Header, Right, Badge,
    Content, Footer, FooterTab, Button, Icon,
    Text, CardItem, Card, Left, Spinner
} from 'native-base';

const ACCESS_TOKEN = 'access_token';
export default class lgoin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mob_email: '',
        }
    }

    userLogin = () => {

        console.log("user mobile:", this.state.mob_email);
        AsyncStorage.setItem("user_mobile", this.state.mob_email);
        this.props.navigation.navigate('Home');
    }



    render() {

        return (
            <Container style={{ backgroundColor: '#F7F7F6' }}>
                <Header style={{ backgroundColor: 'white' }} >
                    <Body>
                        <Title style={{ color: '#5e5e5e' }}>Login</Title>
                    </Body>

                </Header>
                <Content style={{ marginTop: 100 }}>



                    <Card>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Icon active ios='ios-person' android="md-person" style={{ fontSize: 30, color: '#ffc033' }} />
                                    <Input placeholder='Mobile Number' onChangeText={(mob_email) => this.setState({ mob_email })} />
                                </Item>




                                <Button onPress={this.userLogin} block danger iconLeft style={{ marginTop: 20, backgroundColor: '#ffc033' }} >
                                    <Text>Login</Text>
                                </Button>
                            </Body>

                        </CardItem>

                    </Card>





                </Content >



            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttoncont: {
        flex: 1,
        padding: 10,


    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 100

    },

    error: {
        color: '#C62828',
        paddingTop: 10,
        fontSize: 12,
        textAlign: 'center'

    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 40,
        width: 35,
        padding: 5
    },
    btnImage:
    {
        width: 20,
        height: 20
    }
});
