import React, { Component } from 'react';
import { Platform, StyleSheet, ToastAndroid, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Content, Card, CardItem, Thumbnail, Image } from 'native-base';
import Icon from 'react-native-ionicons';
import { withNavigation } from 'react-navigation';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            totalBill: 0
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    }
    componentWillMount = async () => {
        try {
            const value = await AsyncStorage.getItem('cartdata');
            if (value !== null) {
                // We have data!!
                console.log("card data :", value)
                this.setState({ items: JSON.parse(value) });
                this.state.items.forEach(element => {
                    this.setState({ totalBill: this.state.totalBill + (element.price * element.qty) })
                });

            }
        } catch (error) {
            // Error retrieving data
        }

    }



    checkout = () => {
        const { items } = this.state;
        let response = fetch('https://wallety.000webhostapp.com/api/sendinvoice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: "9686910438"
            })
        });
        let res = JSON.stringify(response);
        console.log("server response:", res)
        this.clearCart();
        ToastAndroid.show('Check your mobile for order details!', ToastAndroid.SHORT);

        this.props.navigation.navigate('Home');

    }

    clearCart = async () => {
        console.log("called")
        try {
            await AsyncStorage.removeItem('cartdata');

        } catch (error) {
            // Error retrieving data
        }

        this.callRoute("Home");

    }
    callRoute = (name) => {
        this.props.navigation.navigate(name);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('cartdata');
            if (value !== null) {
                // We have data!!
                this.setState({ items: JSON.parse(value) });

                this.setState({ totalBill: null });
                this.state.items.forEach(element => {
                    this.setState({ totalBill: this.state.totalBill + (element.price * element.qty) })
                });

            }
        } catch (error) {
            // Error retrieving data
        }
        await this.forceUpdateHandler();
    };

    async forceUpdateHandler() {
        await this.render();
    };



    async incqty(cid) {
        console.log("inc id is :", cid);
        await AsyncStorage.getItem('cartdata')
            .then(data => {

                console.log("fetched data:", data);

                data = JSON.parse(data);
                console.log("parsed data:", data);

                data.forEach(olddata => {
                    if (olddata.id === cid) {
                        olddata.qty++;
                        olddata.total = olddata.price * olddata.qty;
                    }
                });
                console.log("updated dtaa:", data);

                AsyncStorage.setItem('cartdata', JSON.stringify(data));

            }).done();
        this._retrieveData();
    }

    async decqty(cid) {
        console.log("dec id is :", cid);
        await AsyncStorage.getItem('cartdata')
            .then(data => {

                console.log("fetched data:", data);

                data = JSON.parse(data);
                console.log("parsed data:", data);

                data.forEach(olddata => {
                    if (olddata.id === cid) {
                        olddata.qty--;
                        olddata.total = olddata.price * olddata.qty;
                    }
                });
                console.log("updated dtaa:", data);

                AsyncStorage.setItem('cartdata', JSON.stringify(data));

            }).done();
        this._retrieveData();
    }
    async removeCardItem(cid) {
        AsyncStorage.getItem('cartdata')
            .then((data) => {
                const pdata = (JSON.parse(data))

                for (let i = 0; i < pdata.length; i++) {
                    if (pdata[i].id == cid) {
                        pdata.splice(i, 1);
                    }
                }
                AsyncStorage.setItem('cartdata', JSON.stringify(pdata));


            })
        this._retrieveData();
    }

    renderCard() {
        if (this.state.items == null) {
            return null;
        }

        return this.state.items.map((data, key) => {
            return (
                data.qty != 0 ?
                    (<Card key={key}>
                        <CardItem bordered>
                            <Left>
                                <Thumbnail source={require('../asstes/images/latte.png')} />
                                <Body>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
                                    <Text style={{ fontSize: 12, color: 'maroon' }} note>Qty: {data.qty}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Text style={{ fontSize: 22 }}>Rs :{data.price * data.qty}</Text>
                            </Right>
                        </CardItem>

                        <CardItem cardBody>
                            <Left style={{ marginLeft: 10 }}>
                                <Button onPress={() => this.removeCardItem(data.id)} transparent>
                                    <Icon name="trash" />
                                    <Text> Remove</Text>
                                </Button>
                            </Left>
                            <Body style={{ marginLeft: 40 }}>
                                <Button onPress={() => this.incqty(data.id)} transparent>
                                    <Icon name="add-circle" />

                                </Button>
                            </Body>
                            <Right style={{ marginRight: 30 }}>
                                <Button onPress={() => this.decqty(data.id)} transparent>
                                    <Icon name="remove-circle" />
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>) : null
            )
        })
    }
    render() {

        return (
            <Container>
                <Content>
                    <Header>
                        <Left>
                            <Button onPress={() => { this.props.navigation.goBack() }} transparent>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Cart</Title>
                        </Body>
                        <Right>
                            <Button onPress={() => this.clearCart()} transparent>
                                <Icon name='trash' />
                                <Text > Clear</Text>
                            </Button>
                        </Right>
                    </Header>
                    {this.renderCard()}
                    {this.state.items !== null ?
                        <View>
                            <Card>
                                <CardItem header>
                                    <Text style={{ fontSize: 20 }}>Total :{this.state.totalBill} </Text>
                                </CardItem>
                            </Card>
                            <Button onPress={() => this.checkout()} style={{ marginTop: 10 }} full light>
                                <Text>Checkout</Text>
                            </Button></View> : null}
                </Content>
            </Container>
        )
    }
}