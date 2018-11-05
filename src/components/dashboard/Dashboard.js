import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { firestoreConnect, isEmpty } from 'react-redux-firebase';

import { createConversation, getConversation } from '../../actions/index';
import Friends from'../message/Friends';
import HeaderFrame from '../message/HeaderFrame';
import ChatFrame from '../message/ChatFrame';
import '../../style/message.scss';

const backgrey ={
  background: "#444753",
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoadList: false,
      chatUserId: ""
    };
  }

  loaded() {
    this.setState({
      isLoadList: true,
    })
  }

  sortListUsers(users, chatlist) {
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
              <Friends friendsList = {users} onClick ={this.clickUser.bind(this)}/>  
            </div>
            <div className="col-8 backmessage">
              <div className="chat">
                <HeaderFrame chatUserId={this.state.chatUserId}/>
                <div className="chat-history">
                  <ChatFrame 
                    conversation = {this.props.conversation ? this.props.conversation : null}
                    authId = {authUser.uid}
                    chatUserId = {this.state.chatUserId}
                  />
                </div>    
                <div className="chat-message clearfix align-left">
                  <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>         
                  <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                  <i className="fa fa-file-image-o"></i>
                  <button>Send</button>
                </div> 
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
)(Dashboard)
