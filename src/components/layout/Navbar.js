import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const uid = props.auth.uid != null ? <SignedInLinks/>:<SignedOutLinks/>;
  return (
    <nav className="nav-wrapper blue darken-4">
      <div className="container left">
        <Link to='/' className="brand-logo left">DriffChat</Link>
        {uid}
      </div>
    </nav>
  )
} 


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps,null),
  firestoreConnect((props) => [
    {collection: 'users'},
])) (Navbar)
