import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
// import SkillsForm from "./SkillsForm";
import LoaderButton from "../components/LoaderButton";

export default class EditJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      isLoading: null
    }
  }

  updateJob = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
      method: 'PUT',
      body: JSON.stringify({
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
        freelancersDesired: this.state.freelancersDesired,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(() => document.getElementById('database-success').click()
  ).then(() => this.props.getJob())
  .catch((error) => document.getElementById('database-failure').click()
)
}

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })

    try {
      this.updateJob();
      this.props.backToList();
    } catch (e) {
      alert(e);
    }
  }

  renderJobType() {
    if (this.props.type === 'Hourly') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder={this.props.job.rate}/>
          </FormGroup>
          <FormGroup controlId="duration">
            <ControlLabel>Work Hours</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.duration}
              type="number"
              placeholder={this.props.job.duration}
            />
          </FormGroup>
          <FormGroup controlId="endDate">
            <ControlLabel>Job End Date</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.endDate}
              type="date"
              placeholder={this.props.job.endDate}
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.props.type === 'Daily') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder={this.props.job.rate}/>
          </FormGroup>
          <FormGroup controlId="duration">
            <ControlLabel>Work Hours</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.duration}
              type="number"
              placeholder={this.props.job.duration}
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.props.type === 'Project') {
      return(
        <React.Fragment>
          <FormGroup controlId="rate">
            <ControlLabel>Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.rate}
              type="number"
              placeholder={this.props.job.rate}/>
          </FormGroup>
          <FormGroup controlId="endDate">
            <ControlLabel>Job End Date</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.endDate}
              type="date"
              placeholder={this.props.job.endDate}
            />
          </FormGroup>
        </React.Fragment>
      )
    } else if (this.props.type === 'Task') {
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
    return(

      <React.Fragment>
        <LoaderButton
          block
          bsSize="large"
          onClick={this.props.backToList}
          isLoading={this.state.isLoading}
          text="Back to App List"
          loadingText="Loading..."
        />
        <br />
        <FormGroup controlId="title" >
          <ControlLabel>Job Title</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.title}
            type="text"
            placeholder={this.props.job.title} />
       </FormGroup>

        <FormGroup controlId="description">
          <ControlLabel>Job Description</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.description}
            componentClass="textarea"
            placeholder={this.props.job.description} />
        </FormGroup>

        {/* <FormGroup controlId="type">
          <ControlLabel>Job Type</ControlLabel>
          <FormControl componentClass="select" onChange={this.handleChange} value={this.state.type}>
            <option value="Select">Select Job Type</option>
            <option value="Daily">Daily Payment</option>
            <option value="Project">Project with Milestones</option>
            <option value="Task">Pay per Task</option>
            <option value="Hourly">Hourly Payment</option>
          </FormControl>
        </FormGroup> */}

        <FormGroup controlId="date">
          <ControlLabel>Job Start Date</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.date}
            type="date"
            placeholder={this.props.job.date}
          />
        </FormGroup>

        { this.renderJobType() }

        <FormGroup controlId="interviewQuestions">
          <ControlLabel>Questions for Freelancer</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.interviewQuestions}
            type="text"
            placeholder={this.props.job.interviewQuestions}
          />
        </FormGroup>

        {/* <SkillsForm
          industry={this.state.industry}
          industries={this.props.industries}
          parentComponent='EditJob'
          handleSkill={(skill, num) => this.handleSkill(skill, num)}
          skills={[this.state.jobPrimarySkill, this.state.jobSecondarySkill, this.state.jobTertiarySkill]}
        /> */}

       <LoaderButton
         block
         bsSize="large"
         onClick={this.handleSubmit}
         isLoading={this.state.isLoading}
         text="Update Job Details"
         loadingText="Loading..."
       />
      </React.Fragment>
    )
  }
}
