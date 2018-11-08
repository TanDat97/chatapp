import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {createConversation, sendMessage, chooseFile } from '../../actions/index';
import '../../style/message.scss';

// const inputImageStyle = {
//     backgroundColor: "Transparent",
//     border: "none",
//     cursor: "pointer",
//     overflow: "hidden",
//     outline:"none"
// }

// function handledUpLoad (event) {
//     const file = event.target.files[0];
//         console.log(file);
        
//         let formData = new FormData();
//         formData.append('file', file);

//         // this.props.uploadImage(file)
        
//         var firebase = getFirebase()
//         var storageRef = firebase.storage().ref('conversations/4001/upload/images/'+file.name);
//         var task = storageRef.put(file);
        
//         task.on('state_changed', function(snapshot){
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//               case firebase.storage.TaskState.PAUSED: // or 'paused'
//                 console.log('Upload is paused');
//                 break;
//               case firebase.storage.TaskState.RUNNING: // or 'running'
//                 console.log('Upload is running');
//                 break;
//             case firebase.storage.TaskState.SUCCESS: // or 'running'
//                 console.log('Upload is SUCCESS');
//                 break;
//             }
//           }, err => {
//                 console.log(err);
                
//           }, () => {
//             console.log('Upload is SUCCESS');
//           });
// }

const SendMessage = (props) => {
    console.log(props);
    var conversation = {};
    const displayName = props.displayName;
    const authId = props.authId;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId,chatUserId);
    const file = props.file;
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
                } else if (chatUserId !=="" && !isEmpty(conversation) && file === null){ 
                    props.sendMessage(authId, chatUserId, input.value, displayName, conversation[0].history);
                } else if (chatUserId !=="" && !isEmpty(conversation) && file !== null) {

                }
                input.value = ''
            }}>
                <div className="chat-message clearfix align-left">
                    <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ref={node => input = node}></textarea>         
                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o">
                        <input type="file" id="upImage" name="upImage" 
                            onChange={event => {
                                console.log(event.target.files);
                                props.chooseFile(event.target.files[0]);
                            }}
                        />
                    </i>
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
        file: state.fileReducer.file,
    }
}
  
const mapDispatchToProps =(dispatch) => {
    return {
        sendMessage: (authId, chatUserId, text, displayName, history) => dispatch(sendMessage(authId, chatUserId, text, displayName, history)),
        createConversation: (authId, chatUserId, text, displayName) => dispatch(createConversation(authId, chatUserId, text, displayName)),
        chooseFile: (file) => dispatch(chooseFile(file)),
        
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SendMessage)