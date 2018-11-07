import React from 'react';
// import ReactLoading from "react-loading";
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
// import moment from 'moment';
import {createConversation, sendMessage, getConversation } from '../../actions/index';
import '../../style/message.scss';

const SendMessage = (props) => {
    var conversation = {};
    const displayName = props.displayName;
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId,chatUserId);
    let input;
    if(!isEmpty(props.converdata)){
        conversation = props.converdata.filter(conver => conver.id === converID.toString()); 
        return (
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                if (chatUserId !=="" && isEmpty(conversation)){
                    props.createConversation(authId, chatUserId, input.value, displayName);
                } else if (chatUserId !=="" && !isEmpty(conversation)){ 
                    props.sendMessage(authId, chatUserId, input.value, displayName, conversation[0].history);
                }
                input.value = ''
            }}>
                <div className="chat-message clearfix align-left">
                    <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ref={node => input = node}></textarea>         
                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>
                    <button>Send</button>
                </div> 
            </form>
        )
    } else {
        return(
            <div className="chat-message clearfix align-left">
                <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ref={node => input = node}></textarea>         
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button>Send</button>
            </div> 
        )
    }
}

const mapStateToProps = (state ,ownProps) => {
    return {
        converdata: state.firestore.ordered.conversation,
    }
}
  
const mapDispatchToProps =(dispatch) => {
    return {
        sendMessage: (authId, chatUserId, text, displayName, history) => dispatch(sendMessage(authId, chatUserId, text, displayName, history)),
        createConversation: (authId, chatUserId, text, displayName) => dispatch(createConversation(authId, chatUserId, text, displayName)),
        getConversation: (authId, chatUserId) => dispatch(getConversation(authId, chatUserId)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SendMessage)