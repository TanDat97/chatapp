import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { createConversation, getConversation } from '../../actions/index';
import Friends from'../message/Friends';
import HeaderFrame from '../message/HeaderFrame';
import ChatFrame from '../message/ChatFrame';
import SendMessage from '../message/SendMessage';
import '../../style/message.scss';

const backgrey ={
  background: "#444753",
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatUserId: ""
    };
  }

  hashConversationID (a,b) { 
    var hashA = 0
    var hashB = 0
    for (var i = 0; i<a.length; i++) {
        var temp = a.charCodeAt(i)
        hashA +=  temp
    }
    for (i = 0; i<b.length; i++) {
        temp = b.charCodeAt(i)
        hashB +=  temp
    }
    return hashA+hashB
  }

  clickUser (userUID) { 
      console.log(userUID);
      this.setState({
        chatUserId: userUID
      })
      this.props.getConversation(this.props.auth.uid,userUID)
  }

  render() {
    var authUser = this.props.auth;
    var users = this.props.users;
    if(users)
      users = users.filter(user => user.id !== authUser.uid);
    if (authUser.isEmpty === false) {   
      return (
        <div className="dashboard container">
          <div className="row" style={backgrey}>
            <div className="col-4 people-list">
              <div className="search">
                <input type="text" placeholder="search" />
                <i className="fa fa-search"></i>
              </div>
              <Friends 
                friendsList = {users} 
                onClick = {this.clickUser.bind(this)}
              />  
            </div>
            <div className="col-8 backmessage">
              <div className="chat">
                <HeaderFrame 
                  authId = {authUser.uid}
                  chatUserId = {this.state.chatUserId}
                  hashConversationID = {this.hashConversationID}
                />
                <div className="chat-history">
                  <ChatFrame 
                    authId = {authUser.uid}
                    chatUserId = {this.state.chatUserId}
                    hashConversationID = {this.hashConversationID}
                  />
                </div>    
                <SendMessage
                  authId = {authUser.uid}
                  chatUserId = {this.state.chatUserId}
                  hashConversationID = {this.hashConversationID}
                  displayName = {authUser.displayName}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <center><ReactLoading type="spinningBubbles" color="black" /></center>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    converdata: state.firestore.ordered.conversation,
    conversation: state.chatReducer.conversation,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    createConversation: (authId, chatUserId) => dispatch(createConversation(authId,chatUserId)),
    getConversation: (authId, chatUserId) => dispatch(getConversation(authId, chatUserId)),
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => [
    {collection: 'conversation'},
])
)(Dashboard)
