import React from 'react';

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

const User = ({user}) => {
  return (
    <li className="clearfix">
      <img src={user.photoURL} style={avatarStyle} alt="avatar" />
      <div className="about">
        <div className="name">{user.displayName}</div>
        <div className="status">
            <i className="fa fa-circle online"></i> online
        </div>
      </div>
    </li>
  )
}

export default User