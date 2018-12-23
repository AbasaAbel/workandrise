import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class JobModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.showModal} onHide={this.props.closeModal}>
          {/* <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header> */}
          <Modal.Body>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
            <hr />
            <h4>
Rate:
              {this.props.rate}
              {' '}
UG Shillings
            </h4>
            {/* <h4>Project Length: {this.props.duration}</h4> */}
            <h4>
Start Date:
              {this.props.date}
            </h4>
            <h4>
Industry:
              {this.props.industry.charAt(0).toUpperCase() + this.props.industry.slice(1)}
            </h4>
            {/* <h4>Skills:</h4>
            <li>{this.props.jobPrimarySkill}</li>
            <li>{this.props.jobSecondarySkill}</li>
            <li>{this.props.jobTertiarySkill}</li> */}

            <h4>Interview Questions</h4>
            <p>{this.props.interviewQuestions}</p>
            {/* <h4>Job Posting Document</h4>
          <p>Download Here</p> */}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
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
              <Button>Apply</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
