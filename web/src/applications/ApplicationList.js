import React, { Component } from "react";
import { ListGroup, ListGroupItem, PageHeader, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import EditJob from "../jobs/EditJob";
import './ApplicationList.css';

export default class ApplicationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      job: {},
      profile: [],
      editJob: null,
      isLoading: null
    }
    this.renderAppsList = this.renderAppsList.bind(this);
    this.renderJobStatus = this.renderJobStatus.bind(this)
    this.backToList = this.backToList.bind(this);
    this.getJob = this.getJob.bind(this);
  }

  componentWillMount() {
    try {
      this.getJobApps();
      this.getJob();
    }
    catch(e) {
      alert(e);
    }
  }

  updateJobStatus = (value) => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
      method: 'PUT',
      body: JSON.stringify({
        complete: value,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      }).then(() => document.getElementById('database-success').click()
      ).catch((error) => document.getElementById('database-failure').click()
      ).then(() => this.getJob())
    }

  getJob = () => {
      return fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
        method: 'GET',
        headers: {
          'x-access-token': this.props.accessToken
        }
      })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            job: response
          })
        })
      })
    }

  getJobApps = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}/apps`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })
    .then((responseText) => {
      var response = responseText.json();
      response.then((response) => {
        this.setState({
          applications: response,
          profile: response.userInfo,
        });
      });
    }).catch((error) => {
      console.log('request failed', error)
      document.getElementById('database-failure').click();
    })
  }

  renderAppsList(applications) {
    return [{}].concat(applications).map((app, i) => (
      i !== 0 && app.file === null
      ? ( <ListGroupItem
        key={app.id}
        >
        <Link to={`/jobs/${app.jobId}/apps/${app.id}`}>
          <h4>
            {app.userInfo.firstName} {app.userInfo.lastName}
          </h4>{ "Submitted: " + (new Date(app.createdAt)).toLocaleString() }
        </Link>

      </ListGroupItem> )
      : ( <React.Fragment key={i}></React.Fragment> )
      )
    )
  }

  backToList() {
    this.setState({ editJob: null })
  }

  renderEditApplication() {
    return(
      <EditJob
        industries={this.props.industries}
        backToList={this.backToList}
        jobId={this.props.jobId}
        accessToken={this.props.accessToken}
        type={this.state.job.type}
        job={this.state.job}
        getJob={this.getJob}
       />
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();

    try {
      this.setState({ editJob: true })
    } catch (e) {
      alert(e);
    }
  }

  handleOffline = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })

    try {
      this.updateJobStatus('true');
    } catch(e) {
      alert(e);
    }
    this.setState({ isLoading: null })

  }

  handleOnline = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })
    try {
      this.updateJobStatus('false');
    } catch(e) {
      alert(e);
    }
    this.setState({ isLoading: null })
  }


  renderJobStatus() {
    const status = JSON.stringify(this.state.job.complete);
    if (status === 'true') {
      return(
        <LoaderButton
          block
          bsSize="large"
          onClick={this.handleOnline}
          isLoading={this.state.isLoading}
          text="Repost Job Online"
          loadingText="Reposting Job..."
        />
      )
    } else {
      return(
        <LoaderButton
          block
          bsSize="large"
          onClick={this.handleOffline}
          isLoading={this.state.isLoading}
          text="Take Job Offline"
          loadingText="Hiding Job..."
        />
      )
    }
  }

  renderApplicantList() {
    return(
      <React.Fragment>
        <PageHeader>Applicant List</PageHeader>

        <Row>
          <Col style={{paddingRight: '2.5px'}} xs={6} md={6} lg={6}>
            <LoaderButton
              block
              bsSize="large"
              onClick={this.handleSubmit}
              isLoading={this.state.isLoading}
              text="Edit Job Details"
              loadingText="Loading..."
            />
          </Col>
          <Col style={{paddingLeft: '2.5px'}} xs={6} md={6} lg={6}>
            {this.renderJobStatus()}
          </Col>
        </Row>
        <br />
        <ListGroup>
          <Col xs={12} md={6} lg={6}>
          { this.renderAppsList(this.state.applications) }
        </Col>
        </ListGroup>
      </React.Fragment>
    )
  }

  render() {
    return(
      <React.Fragment>
        { this.state.editJob === null
        ? this.renderApplicantList()
      : this.renderEditApplication() }
      </React.Fragment>
    )
  }
}
