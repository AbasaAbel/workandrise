import React, { Component } from "react";
import HomeAuth from "./HomeAuth";
import JobList from "../jobs/JobList";
import "./Home.css";
import {Row, Col, Panel, Thumbnail} from 'react-bootstrap';
import logo from '../icon.jpg';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

      // list: true,

    }
  }

  handleLogin = () => {
    try {
      this.props.history.push("/login");
    }
      catch (e) {
      alert(e);
    }
  }

  handleRegister = () => {
    try {
      this.props.history.push("/signup");
    }
      catch(e) {
        alert(e);
      }
  }

  renderLander() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={8} md={8}>
          <div className="lander">
          <div className="Home">
          <Thumbnail src={logo} alt="100x100" />
          </div>
          <h1>Growing Together</h1>
        </div>
        </Col>
        <Col sm={4} md={4}>
        <Panel>
          <HomeAuth
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          />
        </Panel>
        </Col>
        </Row>
      </React.Fragment>
    );
  }

  renderDashboard() {
    return (
      <div className="dashboard">
        <JobList {...this.props}/>
      </div>
    );
  }

  render() {
    return(
      <React.Fragment>
        { this.props.userToken === null
        ? this.renderLander()
      : this.renderDashboard() }
    </React.Fragment>
    );
  }
}
