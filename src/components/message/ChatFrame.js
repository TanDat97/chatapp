import React from 'react';
import ReactLoading from "react-loading";
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {createConversation, getConversation } from '../../actions/index';
import '../../style/message.scss';

// const color1={
//     color: "#AED2A6"
//   };
// const color2={
//     color: "#DAE9DA"
// };

const ChatFrame = (props) => {
    const conversation = props.conversation;
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    console.log(props);

    if(isEmpty(conversation) && chatUserId==="") {
        return (
            <center><div>Choose someone and start your conversation</div></center>
        )
    } else if (isEmpty(conversation)) {    
        return (
            <center><ReactLoading type="spinningBubbles" color="black" /></center>
        )
    } else {
        return (
            <ul>
                {conversation.history.map ((each, index) => {
                    const sec = parseInt(each.sendAt)
                    const date = moment(new Date(sec)).format('l') + " - "  +moment(new Date(sec)).format('LT')
                    if (each.idSend === authId)
                        return (
                            <li className="clearfix" key = {index}>
                                <div className="message-data align-right">
                                    <span className="message-data-time" >{date}</span> &nbsp; &nbsp;
                                    <span className="message-data-name" >{each.displayName}</span> <i className="fa fa-circle me"></i>
                                    
                                </div>
                                <div className="message other-message float-right">
                                    {each.text}
                                </div>
                            </li>
                        )
                    else 
                        return (
                            <li className="clearfix" key = {index}>
                                <div className="message-data align-left">
                                    <span className="message-data-name"><i className="fa fa-circle online"></i>{each.displayName}</span>
                                    <span className="message-data-time">{date}</span>
                                </div>
                                <div className="message my-message">
                                    {each.text}
                                </div>
                            </li> 
                        )
                    }
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state ,ownProps) => {
    const conversation = ownProps.conversation
    return {
        authId: ownProps.authId,
        chatUserId: ownProps.chatUserId,
        conversation: conversation,
    }
  }
  
const mapDispatchToProps =(dispatch) => {
    return {
        createConversation: (authId, chatUserId) => dispatch(createConversation(authId,chatUserId)),
        getConversation: (authId, chatUserId) => dispatch(getConversation(authId, chatUserId)),
    }
  }
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChatFrame))


    /* <li className="clearfix">
                    <div className="message-data align-right">
                    <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                    
                    </div>
                    <div className="message other-message float-right">
                    Hi Vincent, how are you? How is the project coming along?
                    </div>
                </li>
                
                <li>
                    <div className="message-data align-left">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                    <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">
                    Are we meeting today? Project has been already finished and I have results to show you.
                    </div>
                </li> */