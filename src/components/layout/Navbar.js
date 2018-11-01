import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  console.log(props.auth);
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
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps,null)(Navbar)

