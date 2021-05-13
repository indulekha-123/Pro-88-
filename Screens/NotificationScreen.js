import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import SwipeableFlatlist from '../components/SwipeableFlatlist';

import db from '../config.js'

export default class NotificationScreen extends React.Component{
    constructor(){
    super();
    this.state={
        allNotifications : [],
        userId:firebase.auth().currentUser.email
    }
   }






    getNotifications=()=>{
     db.collection("all_notifications").where("notification_status","==","unread")
     .where("targeted_user_id","==",this.state.userId).get()
         onSnapShot((snapshot)=>{
          var allNotification = []
          snapshot.docs.map((doc)=>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotification.push(notification)
          })
          this.setState({
              allNotifications:[...this.state.allNotifications,allNotification]
          })
         })

     
    }

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.targeted_user_id}
            subtitle={item.item_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            
              bottomDivider
          />
        )
      }

      render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25}}>You have no notifications</Text>
                  </View>
                )
                :(
                  <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
                )
              }
            </View>
          </View>
        )
      }
    }

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"50%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"15%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )