import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import './Applications.css';

export default class Applications extends Component {
  constructor(props){
    super(props);

    this.state = {
      jobs: [],
      applications: [],
      transactions: [],
      jobInfo: [],
      apps: []
    }

  }

  componentDidMount() {
    try {
      this.getApps();
    }
    catch(e) {
      alert(e);
    }
  }



  getApps = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/user/apps/${this.props.username}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })
    .then((responseText) => {
      var response = responseText.json();
      response.then((response) => {
        this.setState({
          apps: response,
        });
      });
    })
  }


    renderAppsList(apps) {
      return [{}].concat(apps).map((app, i) => (
        i !== 0 && app.file === null
        ? ( <ListGroupItem
          key={app.id}
          >
            <Link to={`/apps/${app.id}`}>
              <h4>
                {app.jobInfo.title.trim().split('\n')[0]}
              </h4>{ "Application Submitted: " + (new Date(app.createdAt)).toLocaleString()}
            </Link>
          </ListGroupItem> )
          : ( <React.Fragment key={i}></React.Fragment> )
        )
      )
    }


  render() {
      return (
  			<React.Fragment>
          <ListGroup>
            <PageHeader>My Applications</PageHeader>
            { this.renderAppsList(this.state.apps)}
          </ListGroup>

  			</React.Fragment>
  		);
    }
  }
