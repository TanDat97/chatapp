import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import { star } from '../../actions/index';
import '../../style/message.scss';

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

var buttonStarStyle = {
    backgroundColor: "Transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline:"none"
}

const HeaderFrame = (props) => {
    var userChat = {};
    var conversation = {};
     var info = {};
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId,chatUserId);
    if(!isEmpty(props.converdata) && !isEmpty(props.listFriend)){
        conversation = props.converdata.filter(conver => conver.id === converID.toString());
        info = props.listFriend.filter(friend => friend.uid === props.chatUserId)
    }
    if (chatUserId!=="" && !isEmpty(info)){
        if (isEmpty(conversation)){
            userChat = props.users.filter(user => user.id === chatUserId);
            return (
                <div className="chat-header clearfix">
                    <img src={userChat[0].photoURL} alt="avatar" style={avatarStyle}/>
                    <div className="chat-about">
                        <div className="chat-with">Chat with {userChat[0].displayName}</div>
                        <div className="chat-num-messages">Total Message: 0</div>
                    </div>
                    <button onClick = {()=>props.star(authId, chatUserId, props.listFriend, info[0].star)} style={buttonStarStyle}>
                        {info[0].star ? <i className="fa fa-star fill"></i> : <i className="fa fa-star"></i>} 
                    </button>
                </div> 
            )
        } else {
            userChat = props.users.filter(user => user.id === chatUserId);
            return (
                <div className="chat-header clearfix">
                    <img src={userChat[0].photoURL} alt="avatar" style={avatarStyle}/>
                    <div className="chat-about">
                        <div className="chat-with">Chat with {userChat[0].displayName}</div>
                        <div className="chat-num-messages">Total Message: {conversation[0].history.length}</div>
                    </div>
                    <button onClick={()=>props.star(authId, chatUserId, props.listFriend, info[0].star)} style={buttonStarStyle}>
                        {info[0].star ? <i className="fa fa-star fill"></i> : <i className="fa fa-star"></i>} 
                    </button>       
                </div> 
            )
        } 
    } else {
        return (
            <div className="chat-header clearfix">
                <div className="chat-about">
                    <div className="chat-with">Welcome to simple App Chat</div> 
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.firestore.ordered.users,
        converdata: state.firestore.ordered.conversation,
    }
}

const mapDispatchToProps =(dispatch, ownProps) => {
    return {
        star: (authId, chatUserId, listFriend, isStar) => dispatch(star(authId, chatUserId, listFriend, isStar)),
    }
} 
  
export default connect(mapStateToProps,mapDispatchToProps)(HeaderFrame)