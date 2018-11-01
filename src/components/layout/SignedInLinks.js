import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from '../../actions/index';

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
const logOut = {
  color: "black",
  lineHeight: "normal",
}

class SignedInLinks extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <ul className="right">
          <li></li>
          <li><img src={this.props.auth.photoURL} style={avatarStyle} alt=""/></li>

            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <Button id="caret" color="primary">{this.props.auth.displayName}</Button>
              <DropdownToggle caret color="primary" size="sm"/>
              <DropdownMenu>
                <DropdownItem header>Account</DropdownItem>
                <DropdownItem style={logOut}>User Info</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem><NavLink to='/welcome' onClick={this.props.signOut} style={logOut}>LOGOUT</NavLink></DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

        </ul>
      </div>
    )
  }
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
