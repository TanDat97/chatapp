import React from 'react';
import { isEmpty, getFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import {createConversation, sendMessage, chooseFile, clearFile, changeStateUpload } from '../../actions/index';
import '../../style/message.scss';

function handledUpLoad (file) {
    return new Promise((resolve, reject) => { 
        let formData = new FormData();
        formData.append('file', file);
        var firebase = getFirebase();
        var storageRef = firebase.storage().ref('conversations/images/'+file.name);
        var task = storageRef.put(file);
        task.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                case firebase.storage.TaskState.SUCCESS: // or 'running'
                    console.log('Upload is SUCCESS');
                    break;
                default:
            }
        }, err => {
            reject(err);
        }, () => {
            console.log('Upload is SUCCESS');
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                resolve(downloadURL)
            });
        });
    });
}

const SendMessage = (props) => {
    // console.log(props);
    var conversation = {};
    var chatUser = {};
    const listFriend = props.authUser.listFriend;
    const displayName = props.authUser.displayName;
    const authId = props.authUser.id;
    const chatUserId = props.chatUserId;
    const converID = props.hashConversationID(authId, chatUserId);
    const fileReducer = props.fileReducer;
    const isUpload = props.upLoadReducer.isUpload;
    let input1, input2;
    
    if(chatUserId !=="" && !isEmpty(props.converdata)){
        conversation = props.converdata.filter(conver => conver.id === converID.toString());
        chatUser = props.chatUser[0];
        return (
            <form onSubmit={e => {
                e.preventDefault()
                if (!input1.value.trim() && isEmpty(fileReducer)) {
                    return
                }
                if (isEmpty(conversation)){
                    props.createConversation(authId, chatUserId, input1.value, displayName, listFriend, chatUser.listFriend);
                } else if (!isEmpty(conversation) && isEmpty(fileReducer)){ 
                    props.sendMessage(authId, chatUserId, input1.value, displayName, conversation[0].history, listFriend, chatUser.listFriend);
                } else if (!isEmpty(conversation) && !isEmpty(fileReducer)) {
                    props.changeStateUpload();
                    handledUpLoad(fileReducer.file)
                    .then((url) => {
                        props.clearFile();
                        props.sendMessage(authId, chatUserId, url, displayName, conversation[0].history, listFriend, chatUser.listFriend);
                        props.changeStateUpload();
                    })
                    .catch((err)=>console.log(err));
                }
                input1.value = '';
                input2.value = '';
            }}>
                <div className="chat-message clearfix align-left">
                    <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ref={node => input1 = node}></textarea>         
                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <label htmlFor="upload-photo">
                        <i className="fa fa-picture-o" aria-hidden="true" ></i>
                    </label>
                    <span>{!isEmpty(props.fileReducer) ? ' selected - ready to send' : null}</span>
                    <input type="file" name="photo" id="upload-photo" ref={node => input2 = node}
                        onChange={event => {
                            props.chooseFile(event.target.files[0]);
                        }} 
                    />
                    <button>Send</button>
                    <div className="upload">
                        {(isUpload || isEmpty(props.fileReducer))?<div></div>:<ReactLoading type="spin" color="black" height={'25'} width={'25px'}/>}
                    </div>
                </div> 
            </form>
        )
    } else {
        return(
            <div className="chat-message clearfix align-left">
                <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ref={node => input1 = node}></textarea>
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
        fileReducer: state.fileReducer,
        upLoadReducer: state.upLoadReducer,
    }
}
  
const mapDispatchToProps =(dispatch) => {
    return {
        sendMessage: (authId, chatUserId, text, displayName, history, listFriend, listFriendChatUser) => dispatch(sendMessage(authId, chatUserId, text, displayName, history, listFriend, listFriendChatUser)),
        createConversation: (authId, chatUserId, text, displayName, listFriend, listFriendChatUser) => dispatch(createConversation(authId, chatUserId, text, displayName, listFriend, listFriendChatUser)),
        chooseFile: (file) => dispatch(chooseFile(file)),
        clearFile: () => dispatch(clearFile()),
        changeStateUpload: () => dispatch(changeStateUpload()),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SendMessage)