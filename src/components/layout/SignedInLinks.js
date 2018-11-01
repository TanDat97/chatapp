import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../actions/index';

const avatarStyle = {
  marginTop: "12px",
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

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/welcome' onClick={props.signOut}>LOGOUT</NavLink></li>
        <li><img src={props.auth.photoURL} style={avatarStyle} /></li>
      </ul>
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    signOut: () => dispatch (signOut())
 }
}
export default connect(mapStateToProps, mapDispatchToProps,)(SignedInLinks)
