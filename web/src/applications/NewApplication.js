import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import uuidv4 from "uuid";
import "./NewApplication.css";

export default class NewApplication extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,

      job: {},
      employer: {},

      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      qualifications: "",
      interviewQuestions: "",
      noteToEmployer: "",
      rateProposal: "",
      skills: "",
      dateAvailable: "",
    };

    this.linkBackToJobsList = this.linkBackToJobsList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const appId = uuidv4();
      this.setState({
        id: appId
      })
      this.getJob(this.props.location.state.id)

    } catch(e) {
      console.log(e)
    }
  }

  getJob = (params) => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${params}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })
    .then((responseText) => {
      var response = responseText.json();
      response.then((response) => {
        this.setState({
          job: response,
          employer: response.userInfo,
        });
      })
    })
  }

  validateForm() {
    return this.state.qualifications.length > 0 && this.state.interviewQuestions.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  applyForJob = (jobId,firstName, lastName, qualifications, interviewQuestions, noteToEmployer, rateProposal, dateAvailable) => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${jobId}/apps/${this.props.username}`, {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        firstName: firstName,
        lastName: lastName,
        qualifications: qualifications,
        interviewQuestions: interviewQuestions,
        noteToEmployer: noteToEmployer,
        rateProposal: rateProposal,
        dateAvailable: dateAvailable,
        file: null,
        jobId: jobId
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken
      },
    })
  }

  sendMessageToEmployer(message) {
    return API.post('wr-messaging', '/message-received', {
      body: message
    })
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  linkBackToJobsList = () => {
    this.props.history.push('/')
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file size smaller than 25MB");
      return;
    }
    this.setState({ isLoading: true });

    const info = this.props.location.state;


    try {
      this.applyForJob(info.id, this.state.firstName, this.state.lastName,
        this.state.qualifications, this.state.interviewQuestions, this.state.noteToEmployer, this.state.rateProposal, this.state.dateAvailable)
        .then(() => this.sendMessageToEmployer({
          message: `Your job titled ${info.title} on Work&Rise has received an application. Login at https://platform.workandrise.today to review.`,
          phone: this.state.employer.phone
        }))
        .then(() => this.props.history.push('/'))
    }



    catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    this.setState({ isLoading: false });

  }

  render() {

    const info = this.props.location.state;

    return (
      <div className="NewApplication">
        <form onSubmit={this.handleSubmit}>
          <PageHeader>{info.title}</PageHeader>
          <LoaderButton
            block
            bsSize="large"
            onClick={this.linkBackToJobsList}
            text="Back to Jobs"
          />
          <br />

          <FormGroup controlId="qualifications" >
            <ControlLabel>Qualifications</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.qualifications}
              componentClass="textarea"
              placeholder="Please detail why you belive you are an excellent candidate for this position" />
          </FormGroup>

          <FormGroup controlId="interviewQuestions">
            <ControlLabel>{info.interviewQuestions}</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.interviewQuestions}
              componentClass="textarea"
              placeholder="Please respond here..."
            />
          </FormGroup>

          <FormGroup controlId="noteToEmployer">
            <ControlLabel>Note To Employer</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.noteToEmployer}
              componentClass="textarea"
              placeholder="Is there any information you would like the employer to know?"
            />
          </FormGroup>


          <FormGroup controlId="rateProposal">
            <ControlLabel>Your {info.type} Rate Proposal</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rateProposal}
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
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Submit"
            loadingText="Submitting..."
          />
        </form>
      </div>
    );
  }

}
