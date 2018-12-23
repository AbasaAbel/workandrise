import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class ViewProfileButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const btn = { backgroundColor: '#fd6360', color: 'white' };
    return (
      <React.Fragment>
        <Link to={`/profile/${this.props.profile.id}`}>
          <Button
            block
            style={btn}
            bsSize="large"
          >
            View Profile
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}
