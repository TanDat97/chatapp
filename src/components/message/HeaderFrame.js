import React from 'react';
import { connect } from 'react-redux';
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
  

const HeaderFrame = (props) => {
    var user={};
    if(props.chatUserId !== "") {
        user = props.users.filter(user => user.id === props.chatUserId);
        console.log(user);
        return (
            <div className="chat-header clearfix">
                <img src={user[0].photoURL} alt="avatar" style={avatarStyle}/>
                <div className="chat-about">
                    <div className="chat-with">Chat with {user[0].displayName}</div>
                    <div className="chat-num-messages">already 1 902 messages</div>
                </div>
                <i className="fa fa-star"></i>
            </div> 
        )
    } else {
        return (
            <div>no body</div>
        )
    }
}

const mapStateToProps = (state ,ownProps) => {
    return {
        users: state.firestore.ordered.users,
    }
  }
  
  
export default connect(mapStateToProps,null)(HeaderFrame)