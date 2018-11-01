import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m4 green user">
            Danh sách người dùng
          </div>
          <div className="col s12 m8 blue">
            Nội dung tin nhắn
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
