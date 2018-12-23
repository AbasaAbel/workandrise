import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './MessageButton.css';

export default class MessageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const btn = { backgroundColor: '#fd6360', color: 'white' };
    return (
      <React.Fragment>
        <Link to={`/messages/${this.props.threadId}`}>
          <Button
            block
            style={btn}
            bsSize="large"
          >
            Message Thread
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}
