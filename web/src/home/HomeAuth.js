import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class HomeAuth extends Component {
  render() {
    const registerStyle = { backgroundColor: '#fd6360', borderRadius: '40px', color: 'white' };
    const loginStyle = { backgroundColor: '#ffeb3b', borderRadius: '40px', color: 'black' };
    return (
      <React.Fragment>
        <div className="Login" onClick={this.props.handleLogin}>
          <Button
            block
            style={loginStyle}
            bsSize="large"
          >
          Login
          </Button>
        </div>
        <br />
        <div className="Register" onClick={this.props.handleRegister}>
          <Button
            block
            style={registerStyle}
            bsSize="large"
          >
            Register
          </Button>
        </div>
      </React.Fragment>

    );
  }
}
