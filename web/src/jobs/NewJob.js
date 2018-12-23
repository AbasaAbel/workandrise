import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import uuidv4 from "uuid";

import SkillsForm from '../profile/SkillsForm';

import "./NewJob.css";

export default class NewJob extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      type: "",
      title: "",
      description: "",
      rate: "",
      duration: "",
      date: "",
      endDate: "",
      industry: "",
      jobPrimarySkill: "",
      jobSecondarySkill: "",
      jobTertiarySkill: "",
      interviewQuestions: "",
      numberOfTasksRequested: "",
      freelancersDesired: "",

      username: null,
    };

    this.postJob = this.postJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const currentUser = this.props.getCurrentUser();
    const username = currentUser.getUsername();

    try {
      const jobId = uuidv4();
      this.setState({
        username: username,
        id: jobId
      })
    } catch(e) {
      console.log(e);
    }
  }

  validateForm() {
    return this.state.title.length > 0  && this.state.description.length
    > 0  && this.state.rate.length > 0  && this.state.date.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  postJob = () => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${this.props.username}`, {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        type: this.state.type,
        title: this.state.title,
        description: this.state.description,
        rate: this.state.rate,
        duration: this.state.duration,
        date: this.state.date,
        endDate: this.state.endDate,
        industry: this.state.industry,
        jobPrimarySkill: this.state.jobPrimarySkill,
        jobSecondarySkill: this.state.jobSecondarySkill,
        jobTertiarySkill: this.state.jobTertiarySkill,
        interviewQuestions: this.state.interviewQuestions,
        numberOfTasksRequested: this.state.numberOfTasksRequested,
        complete: false,
        freelancersDesired: this.state.freelancersDesired,
        file: null,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken
      },
    }).then((data) => {
      document.getElementById('database-success').click();

    }).catch((error) => {
      document.getElementById('database-failure').click();

    })
    //.then(this.checkStatus);
  }

  // checkStatus = (response) => {
  //   if (response.status >= 200 && response.status < 300) {
  //     return response;
  //   } else {
  //     const error = new Error(`HTTP Error ${response.statusText}`);
  //     error.status = response.statusText;
  //     error.response = response;
  //     console.log(error);
  //     throw error;
  //   }
  // }

  handleSubmit = event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });

    try {
      this.postJob().then(() => this.props.getJobs()).then(() => this.props.history.push("/"))

      }

     catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  renderJobType() {
    if (this.state.type === 'Hourly') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder="Hourly Payment in UGX"/>
          </FormGroup>
          <FormGroup controlId="duration">
            <ControlLabel>Work Hours</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.duration}
              type="number"
              placeholder="Total Hours of Contracted Work"
            />
          </FormGroup>
          <FormGroup controlId="endDate">
            <ControlLabel>Job End Date</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.endDate}
              type="date"
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.state.type === 'Daily') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder="Daily Payment in UGX"/>
          </FormGroup>
          <FormGroup controlId="duration">
            <ControlLabel>Work Hours</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.duration}
              type="number"
              placeholder="Expected Hours of Daily Work"
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.state.type === 'Project') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder="Total Payment for Project in UGX"/>
          </FormGroup>
          <FormGroup controlId="endDate">
            <ControlLabel>Job End Date</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.endDate}
              type="date"
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.state.type === 'Task') {
      return(
        <React.Fragment>
          <FormGroup controlId="numberOfTasksRequested">
            <ControlLabel>Desired Number of Daily Tasks</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.numberOfTasksRequested}
              type="number"
              placeholder="How many tasks do you want to have completed?"
            />
          </FormGroup>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder="UGX Payment per Task"/>
          </FormGroup>
        </React.Fragment>
      )
  } else return null;
}

  handleSkill(skill, num) {
    if (num === 1) {
      this.setState({
        jobPrimarySkill: skill
      });
    }

    if (num === 2) {
      this.setState({
        jobSecondarySkill: skill
      });
    }

    if (num === 3) {
      this.setState({
        jobTertiarySkill: skill
      });
    }
  }

  render() {
    return (

      <div className="NewJob">
        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="title" >
            <ControlLabel>Job Title</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              type="text"
              placeholder="Ex: Farm Hand" />
         </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Job Description</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.description}
              componentClass="textarea"
              placeholder="Please provide a description of the job, task or project... " />
          </FormGroup>

          <FormGroup controlId="type">
            <ControlLabel>Job Type</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleChange} value={this.state.type}>
              <option value="Select">Select Job Type</option>
              <option value="Daily">Daily Payment</option>
              <option value="Project">Project with Milestones</option>
              {/* <option value="Task">Pay per Task</option>
              <option value="Hourly">Hourly Payment</option> */}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="date">
            <ControlLabel>Job Start Date</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.date}
              type="date"
            />
          </FormGroup>

          { this.renderJobType() }

          <FormGroup controlId="interviewQuestions">
            <ControlLabel>Questions for Freelancer</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.interviewQuestions}
              type="text"
              placeholder="Optional.."
            />
          </FormGroup>

          <FormGroup controlId="industry">
            <ControlLabel>Industry</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleChange} value={this.state.industry}>
              <option value="Select">Select Industry</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Tourism">Tourism</option>
              <option value="Construction">Private Construction</option>
              <option value="Engineering">Engineering</option>
              <option value="Professional">Professional Services</option>
              <option value="Creative-arts">Creative Arts</option>
              <option value="Technology">Technology</option>
              <option value="Software-Development">Software Development</option>
              <option value="Food-Service">Food Service</option>
              <option value="Writing">Writing</option>
              <option value="Legal">Legal</option>
              <option value="Sales-Marketing">Sales & Marketing</option>
              <option value="Translation">Translation</option>
            </FormControl>
          </FormGroup>

          <SkillsForm
            industry={this.state.industry}
            industries={this.props.industries}
            parentComponent='NewJob'
            handleSkill={(skill, num) => this.handleSkill(skill, num)}
            skills={[this.state.jobPrimarySkill, this.state.jobSecondarySkill, this.state.jobTertiarySkill]}
          />

          {/* <FormGroup controlId="file">
            <ControlLabel>Job Advertisement</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup> */}

          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
