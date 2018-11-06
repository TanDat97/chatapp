import React from 'react';
import { connect } from 'react-redux';
import '../../style/message.scss';
import { isEmpty } from 'react-redux-firebase';

const avatarStyle = {
    marginTop: "0 px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(188, 188, 188)",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  };
  

const HeaderFrame = (props) => {
    var user = {};
    var conversation = {};
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId,chatUserId);
    if(!isEmpty(props.converdata)){
        conversation = props.converdata.filter(conver => conver.id === converID.toString()); 
    }  
    
    if(chatUserId==="" && isEmpty(conversation)) {
        return (
            <div className="chat-header clearfix">
                <div className="chat-about">
                    <div className="chat-with">Welcome to simple App Chat</div> 
                </div>
            </div>
        )
    } else if (chatUserId !== "" && isEmpty(conversation)){
        user = props.users.filter(user => user.id === chatUserId);
        return (
            <div className="chat-header clearfix">
                <img src={user[0].photoURL} alt="avatar" style={avatarStyle}/>
                <div className="chat-about">
                    <div className="chat-with">Chat with {user[0].displayName}</div>
                    <div className="chat-num-messages">Total Message: 0</div>
                </div>
                <i className="fa fa-star"></i>
            </div> 
        )
    } else if(chatUserId !== "" && !isEmpty(conversation)) {
        user = props.users.filter(user => user.id === chatUserId);
        return (
            <div className="chat-header clearfix">
                <img src={user[0].photoURL} alt="avatar" style={avatarStyle}/>
                <div className="chat-about">
                    <div className="chat-with">Chat with {user[0].displayName}</div>
                    <div className="chat-num-messages">Total Message: {conversation[0].history.length}</div>
                </div>
                <i className="fa fa-star"></i>
            </div> 
        )
    } 
}

const mapStateToProps = (state ,ownProps) => {
    return {
        users: state.firestore.ordered.users,
        converdata: state.firestore.ordered.conversation,
    }
  }
  
  
export default connect(mapStateToProps,null)(HeaderFrame)