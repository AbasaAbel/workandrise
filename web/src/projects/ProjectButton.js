import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../messaging/MessageButton.css';

export default class ProjectButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const btn = { backgroundColor: '#fd6360', color: 'white' };

    return (
      <React.Fragment>
        <Link to={`/projects/${this.props.transactionId}`}>
          <Button
            block
            style={btn}
            bsSize="large"
          >
            Project Milestones
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}
