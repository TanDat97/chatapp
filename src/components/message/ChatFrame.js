import React from 'react';
import ReactLoading from "react-loading";
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import { getConversation } from '../../actions/index';
import '../../style/message.scss';

// const color1={
//     color: "#AED2A6"
//   };
// const color2={
//     color: "#DAE9DA"
// };

const ChatFrame = (props) => {
    var conversation = {};
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId,chatUserId);
    if(!isEmpty(props.converdata)){
        conversation = props.converdata.filter(conver => conver.id === converID.toString()); 
    }  

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
                {conversation[0].history.map ((each, index) => {
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
    return {
        converdata: state.firestore.ordered.conversation,
    }
  }
  
const mapDispatchToProps =(dispatch) => {
    return {
        getConversation: (authId, chatUserId) => dispatch(getConversation(authId, chatUserId)),
    }
  }
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChatFrame))
