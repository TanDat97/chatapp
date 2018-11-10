import React from 'react';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
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


const Friends = (props) => {
  if(!isEmpty(props.friendList)) {
    return (
      <ul className="list">
        {props.friendList.map((each) => { 
          return (
            <li className="clearfix" key={each.id} onClick={() => props.onClick(each.uid)}>
              <img src={each.photoURL} style={avatarStyle} alt="avatar" />
              <div className="about">
                <div className="name">{each.displayName}</div>
                <div className="status">
                  <i className="fa fa-circle online"></i> online
                </div>
              </div>
            </li>
          ) 
        })}
      </ul>
    )
  } else {
    return (
      <center><ReactLoading type="spinningBubbles" color="white" /></center>
    )
  }
}

const mapStateToProps = (state ,ownProps) => {
  return {
      
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Friends)