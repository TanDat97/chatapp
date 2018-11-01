import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    console.log(this.props.auth);
    if (this.props.auth.auth.isEmpty === false) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m4 user">
              Danh sách người dùng
            </div>
            <div className="col s12 m8 blue">
              Nội dung tin nhắn
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
