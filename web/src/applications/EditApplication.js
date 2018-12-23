import React, { Component } from "react";
import { ListGroup, ListGroupItem, PageHeader, FormGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import MessageButton from "../messaging/MessageButton";
import LoaderButton from "../components/LoaderButton";

export default class EditApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: [],
      profile: [],
      job: [],
      isLoading: false,
      showRate: false,
      qualifications: "",
      question: "",
      interviewQuestions: "",
      noteToEmployer: "",
      rateProposal: "",
      editApplication: false,
      dateAvailable: ""
    }

    this.getJobApp = this.getJobApp.bind(this);
  }

  componentDidMount() {
    this.getJobApp();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  getJobApp = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${this.state.job.id}${window.location.pathname}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            application: response,
            profile: response.userInfo,
            job: response.jobInfo
          })
        })
      }).catch((error) => {
        console.log('request failed', error)
        document.getElementById('database-failure').click();
      })
  };


  putApplicationInfo = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${this.state.job.id}${window.location.pathname}`, {
      method: 'PUT',
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        qualifications: this.state.qualifications,
        interviewQuestions: this.state.interviewQuestions,
        noteToEmployer: this.state.noteToEmployer,
        rateProposal: this.state.rateProposal,
        dateAvailable: this.state.dateAvailable,
      })
    }).then(() => {
      this.getJobApp()
    }).then(() => this.setState({ editApplication: false }))
      .catch(err => console.log("PUT EditApplications", err));
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });


    try {
      this.putApplicationInfo()
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading:false })
  }

  handleEditClick = (e) => {
    e.preventDefault();

    this.setState({ editApplication: true })
  }

  handleEditBack = (e) => {
    e.preventDefault();
    this.setState({ editApplication: false })
  }



  renderSavedApplication = () => {
    const thread = this.state.job.userId + '_' + this.state.application.userId;

    return (
      <React.Fragment>
        <ListGroup>
          <PageHeader>{this.state.job.title}</PageHeader>
          <Row>
            <Col style={{paddingRight: '2.5px'}} xs={6} md={6} lg={6}>
              <MessageButton
                threadId={thread}
                userToken={this.props.userToken}
              />
            </Col>
            <Col style={{paddingLeft: '2.5px'}} xs={6} md={6} lg={6}>
              <LoaderButton
                block
                bsSize="large"
                onClick={this.handleEditClick}
                isLoading={this.state.isLoading}
                text="Edit Application"
                loadingText="Submitting..."
              />
            </Col>
          </Row>
          <br />

          <ListGroupItem><i>{this.state.profile.firstName} {this.state.profile.lastName}</i></ListGroupItem>
          <ListGroupItem><b>Job Description</b></ListGroupItem>
          <ListGroupItem>{this.state.job.description}</ListGroupItem>
          <ListGroupItem><b>Qualifications</b></ListGroupItem>
          <ListGroupItem>{this.state.application.qualifications}</ListGroupItem>
          <ListGroupItem><b>Date Available</b>: {this.state.application.dateAvailable}</ListGroupItem>
          <ListGroupItem><b>Interview Questions: </b>{this.state.job.interviewQuestions}</ListGroupItem>
          <ListGroupItem><b>My Response:</b> {this.state.application.interviewQuestions}</ListGroupItem>
          <ListGroupItem><b>Note to Employer</b>: {this.state.application.noteToEmployer}</ListGroupItem>
          <ListGroupItem><b>Proposed Hourly Wage: {this.state.job.rate}</b></ListGroupItem>
          <ListGroupItem><b>My Proposal</b>: {this.state.application.rateProposal}</ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  };

  renderEditApplicationForm = () => {
    return (
      <div className="NewApplication">
        <form onSubmit={this.handleSubmit}>
          <PageHeader>{this.props.title}</PageHeader>
          <LoaderButton
            block
            bsSize="large"
            onClick={this.handleEditBack}
            text="Back to Jobs"
          />
          <br />

          <FormGroup controlId="qualifications" >
            <ControlLabel>Qualifications</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.qualifications}
              componentClass="textarea"
              placeholder={this.state.application.qualifications} />
          </FormGroup>

          <FormGroup controlId="interviewQuestions">
            <ControlLabel>{this.state.job.interviewQuestions}</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.interviewQuestions}
              componentClass="textarea"
              placeholder={this.state.application.interviewQuestions}
            />
          </FormGroup>

          <FormGroup controlId="noteToEmployer">
            <ControlLabel>Note To Employer</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.noteToEmployer}
              componentClass="textarea"
              placeholder={this.state.application.noteToEmployer}
            />
          </FormGroup>


          <FormGroup controlId="rateProposal">
            <ControlLabel>Your {this.props.type} Rate Proposal</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rateProposal}
              placeholder={this.state.job.rate}
              type="number"
            />
          </FormGroup>

          <FormGroup controlId="dateAvailable">
            <ControlLabel>Date Available for Work</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.dateAvailable}
              type="date"
            />
          </FormGroup>

          {/* <FormGroup controlId="file">
            <ControlLabel>Resume</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup> */}

          <LoaderButton
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            onClick={this.handleSubmit}
            isLoading={this.state.isLoading}
            text="Submit"
            loadingText="Submitting..."
          />
        </form>
      </div>
    );
  };


  render() {
    return (
      <React.Fragment>
        {!this.state.editApplication ? this.renderSavedApplication() : this.renderEditApplicationForm()}
      </React.Fragment>
    )
  }
}
