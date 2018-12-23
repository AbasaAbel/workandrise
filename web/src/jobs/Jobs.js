import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import '../applications/Applications.css';

export default class Jobs extends Component {
  constructor(props){
    super(props);

    this.state = {
      jobs: [],
      applications: [],
      transactions: [],
      jobInfo: [],
      apps: []
    }
    this.renderJobsList = this.renderJobsList.bind(this);

  }

  componentDidMount() {
    try {
      this.getJobs();
    }
    catch(e) {
      alert(e);
    }
  }

  getJobs = () => {
      fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/all/${this.props.username}`, {
        method: 'GET',
        headers: {
          'x-access-token': this.props.accessToken
        }
      })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            jobs: response,
          });
        });
      })
    }




    renderJobsList(jobs) {
      return [{}].concat(jobs).map((job, i) => (
        i !== 0
        ? ( <ListGroupItem
          key={job.id}
          >
          <Link to={`/jobs/${job.id}`}>
            <h4>
              {job.title.trim().split('\n')[0]}
            </h4>Job Type: {job.type }
          </Link>

          </ListGroupItem> )
          : ( <ListGroupItem
            key="new"
            href="/jobs/create"
            ><Link to="/jobs/create">
              <h4><b>{'\uFF0B'}</b>Create New Job</h4>
            </Link>
            </ListGroupItem> )
        ))
      }

  render() {
      return (
  			<React.Fragment>
          <PageHeader>Review Applications<br /><small>Here you can see who applied to your jobs, edit job details, send messages, & hire!</small></PageHeader>
  				<ListGroup>
  					{ this.renderJobsList(this.state.jobs) }
  				</ListGroup>


  			</React.Fragment>
  		);
    }
  }
