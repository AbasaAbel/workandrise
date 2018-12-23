import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class BlockButtons extends Component {
  render() {
    return (
      <div className="fluid">
        {/* <Button><Glyphicon glyph="star"/>Save Job</Button> */}
        <Link to={`/profile/${this.props.profile}`}>
          <Button>
            <Glyphicon glyph="user" />
            {' '}
Profile
          </Button>
        </Link>

        <Button onClick={this.props.openModal}>
          <Glyphicon glyph="search" />
          {' '}
View Job
        </Button>

        <Link to={{
          pathname: `/jobs/${this.props.jobId}/apps`,
          state: {
            title: this.props.title,
            type: this.props.type,
            interviewQuestions: this.props.interviewQuestions,
            id: this.props.id,

          },
        }}
        >
          <Button onClick={this.props.chooseJob}>
            <Glyphicon glyph="check" />
            {' '}
Apply
          </Button>
        </Link>
      </div>
    );
  }
}
