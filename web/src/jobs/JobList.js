import React, { Component } from "react";
import JobBlock from './JobBlock';
import Notifications from "../components/Notifications";
import { PageHeader, Glyphicon, Col } from "react-bootstrap";
import './JobList.css';

export default class JobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    }
  }


  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await this.props.getJobs()
      this.setState({
        isLoading: null
      })
    }
    catch (e) {
      console.log(e)
      alert(e);
    }

  }

  render() {
    return (
      <React.Fragment>
        <Notifications {...this.props} />
        <PageHeader>Available jobs &nbsp;
                  {this.state.isLoading === null ? (
            <Glyphicon glyph="refresh" onClick={this.handleSubmit}
            />
          ) : (
              <Glyphicon glyph="refresh" className="spinning"
              />
            )
          }
        </PageHeader>
        {/* <Row> */}
            <Col xs={12} md={6} lg={6}>
              <ul>
                {this.props.jobs.map((job, index) => (
                  job.complete !== true && index % 2 === 0
                    ? (<li key={index}>
                      <JobBlock
                        {...this.props.jobs[index]}
                        applyForJob={this.applyForJob}
                        getJob={this.getJob}
                      /></li>)
                    : (<React.Fragment key={index}></React.Fragment>))
                )
                }
              </ul>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <ul>
                {this.props.jobs.map((job, index) => (
                  job.complete !== true && index % 2 === 1
                    ? (<li key={index}>
                      <JobBlock
                        {...this.props.jobs[index]}

                        applyForJob={this.applyForJob}
                        getJob={this.getJob}
                      /></li>)
                    : (<React.Fragment key={index}></React.Fragment>))
                )
                }
              </ul>
            </Col>
        {/* </Row> */}
      </React.Fragment>
    )
  }
}

  // Pagination needs to be built out, can manage the page number with state
  // Can manage the 'page number' based on the state
  //   <JobBlock  {...this.state.jobs[0]}  />
