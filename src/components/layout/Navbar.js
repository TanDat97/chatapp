import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
    
      <div className="container left">
        <Link to='/' className="brand-logo">DriffChat</Link>
      </div>
        <SignedInLinks/>
        <SignedOutLinks/>
    </nav>
  )
}

export default Navbar
