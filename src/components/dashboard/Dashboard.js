import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';

import { getConversation, star, searchByName } from '../../actions/index';
import Friends from'../message/Friends';
import HeaderFrame from '../message/HeaderFrame';
import ChatFrame from '../message/ChatFrame';
import SendMessage from '../message/SendMessage';
import '../../style/message.scss';

const backgrey = {
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
    // this.props.getConversation(this.props.auth.uid,userUID);
  }

  findStarId(authId, users) {
    var user = users.filter(user => user.id === authId);
    return user[0].star;
  }

  render() {
    var authUser = this.props.auth;
    var users = this.props.users;
    var starId = '1';
    var friendReducer = this.props.friendReducer;
    if(users) {
      users = users.filter(user => user.id !== authUser.uid);
      starId = this.findStarId(authUser.uid, this.props.users);
    }
    if (authUser.isEmpty === false) {   
      return (
        <div className="dashboard container">
          <div className="row" style={backgrey}>   
            <div className="col-4 people-list">
              <div className="search">
                <input type="text" placeholder="search"
                  onChange={e => {
                    e.preventDefault()
                    this.props.searchByName(e.target.value, users);
                  }}
                />
                <i className="fa fa-search"></i>
              </div>
              <Friends 
                friendList = {friendReducer.name === null||(isEmpty(friendReducer))?users:friendReducer.searchResult}
                onClick = {this.clickUser.bind(this)}
                searchByName = {this.props.searchByName}
              />  
            </div>
            <div className="col-8 backmessage">
              <div className="chat">
                <HeaderFrame 
                  authId = {authUser.uid}
                  chatUserId = {this.state.chatUserId}
                  starId = {starId}
                  hashConversationID = {this.hashConversationID}
                  
                />
                <div id="chat-history" className="chat-history">
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

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    users: state.firestore.ordered.users,
    converdata: state.firestore.ordered.conversation,
    auth: state.firebase.auth,
    conversation: state.chatReducer.conversation,
    friendReducer: state.friendReducer,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getConversation: (authId, chatUserId) => dispatch(getConversation(authId, chatUserId)),
    star: (authId, chatUserId) => dispatch(star(authId, chatUserId)),
    searchByName: (name, friendList) => dispatch(searchByName(name, friendList)),
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => [

])
)(Dashboard)
