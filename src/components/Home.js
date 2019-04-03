/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ToastAndroid, StyleSheet, Text, View,AppRegistry,AsyncStorage} from 'react-native';
var shopData = require('./data.json');

import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card,CardItem,Thumbnail,Image } from 'native-base';
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      items:[]
    }
  }
  async componentWillMount(){
    let data=await AsyncStorage.getItem('user_mobile');
    console.log("user mobile:",data);
    if(data==null){
     this.props.navigation.navigate('Login');
    }
    
  }
  addItem(data){
  this.addto(data);
  }
async addItem(newdata){
  
  try {
    var data = await AsyncStorage.getItem('cartdata');
    var repeatedItem=false;
    if(data!=null){
      console.log("not null comming");
      
      data = JSON.parse(data);
      data.forEach(olderData => {
        if(olderData.id===newdata.id){
          repeatedItem=true;
          olderData.qty++;
          olddata.total=olddata.price*olddata.qty;
        }
      });
      if(repeatedItem==true){
        AsyncStorage.setItem( 'cartdata', JSON.stringify( data ) );

      }else{
        data.push(newdata);
        await AsyncStorage.setItem('cartdata', JSON.stringify(data));
      }
     
    }
    else{
      console.log(" null comming")

        const emptData=[];
        emptData.push(newdata);
      await AsyncStorage.setItem('cartdata',JSON.stringify(emptData));
     
    }

    ToastAndroid.show('Your ' + newdata.name + ' is added to cart!', ToastAndroid.SHORT);

  } catch (error) {
    // Error saving data
  }
  this._retrieveData();
  
 
}
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('cartdata');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>NammaCafe</Title>
          </Body>
                    <Right>
            
            <Button onPress={() => navigate('Cart')} transparent>
              <Icon name='cart' />
            </Button>
           
          </Right>
        </Header>

        <Content>
        
          {shopData.map((data,key) =>{
            return(
              <Card key={key}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../asstes/images/latte.png')} />
                <Body>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>{data.name}</Text>
                  <Text style={{fontSize:12,color:'maroon'}} note>Rs: {data.price}</Text>
                </Body>
              </Left>
              <Right>

              <Button onPress={() => this.addItem(data)} small  style={{backgroundColor:'gray'}} ><Text style={{color:'white'}}> Add To Cart </Text></Button>

              </Right>
            </CardItem>
            </Card>
            )
          })}
        
           
          
        </Content>



      </Container>
    );
  }
}

