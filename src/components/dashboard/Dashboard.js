import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


// import Message from '../message/message';
import User from'../message/user';
import '../../style/message.scss';

const color1={
  color: "#AED2A6"
};
const color2={
  color: "#DAE9DA"
};

const backgrey ={
  background: "#444753",
}


class Dashboard extends Component {
  render() {
    if (this.props.auth.isEmpty === false) {
      var users = this.props.users;
      if(this.props.users){
        users = this.props.users.filter(user => user.uid !== this.props.auth.uid);
      }
      return (
        <div className="dashboard container">
          <div className="row" style={backgrey}>
            <div className="col-4 people-list">
              <div className="search">
                <input type="text" placeholder="search" />
                <i className="fa fa-search"></i>
              </div>
              <ul className="list">
                  {
                    users && users.map((user) => { return (<User user={user} key={user.id}/>) })
                  }
              </ul>             
            </div>
            <div className="col-8 backmessage">
              <div className="chat">
                <div className="chat-header clearfix">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                  <div className="chat-about">
                    <div className="chat-with">Chat with Vincent Porter</div>
                    <div className="chat-num-messages">already 1 902 messages</div>
                  </div>
                  <i className="fa fa-star"></i>
                </div> 
                <div className="chat-history">
                  <ul>
                    <li className="clearfix">
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
                    </li>
                    
                    <li className="clearfix">
                      <div className="message-data align-right">
                      <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                      <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                      
                      </div>
                      <div className="message other-message float-right">
                      Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                      </div>
                    </li>
                    
                    <li>
                      <div className="message-data align-left">
                      <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                      <span className="message-data-time">10:20 AM, Today</span>
                      </div>
                      <div className="message my-message">
                      Actually everything was fine. I'm very excited to show this to our team.
                      </div>
                    </li>
                    
                    <li>
                      <div className="message-data align-left">
                      <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                      <span className="message-data-time">10:31 AM, Today</span>
                      </div>
                      <i className="fa fa-circle online"></i>
                      <i className="fa fa-circle online" style={color1}></i>
                      <i className="fa fa-circle online" style={color2}></i>
                    </li>
  
                  </ul>
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
        <div>Loading....</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  }
}

export default compose(
  connect(mapStateToProps,null),
  firestoreConnect([
    { collection: 'users' }
  ])
)(Dashboard)
