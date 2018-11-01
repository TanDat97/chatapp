import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from '../message/user';
import Message from '../message/message';

const backgrey ={
  background: "#444753",
}

class Dashboard extends Component {
  render() {
    console.log(this.props.auth);
    if (this.props.auth.auth.isEmpty === false) {
      return (
        <div className="dashboard container">
          <div className="row" style={backgrey}>
            <div className="col-4">
              <User/>
            </div>
            <div className="col-8 backmessage">
              <Message/>
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
  return {
    auth: state.firebase
  }
}

export default connect(mapStateToProps,null)(Dashboard)
