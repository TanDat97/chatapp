import React, { Component } from 'react';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { signInGoogle } from '../../actions/index';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  googleLogin = (e) => {
    e.preventDefault();
    this.props.signInGoogle();
    this.props.history.push('../');
  }

  render() {
    return (
      <div className="container">
        <div className="googlebutton">
          <GoogleButton onClick={this.googleLogin}/>
        </div>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn blue lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      users: state.firestore.ordered.users,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    signInGoogle: () => dispatch (signInGoogle())
 }
}
export default connect(mapStateToProps, mapDispatchToProps,)(SignIn)
