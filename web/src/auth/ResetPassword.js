import React, { Component } from "react";
import {Row,Col, FormGroup, FormControl, ControlLabel, PageHeader, Panel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"
import config from "../config";
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";
import ReactPhoneInput from "react-phone-input-2";


export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      enterCodeScreen: false,
      phone: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.phone.length > 0 ;
  }

  validatePasswordForm() {
    return(
      this.state.code.length > 0 &&
      this.state.newPassword.length > 0 &&
      this.state.newPassword === this.state.confirmPassword
    );
  }

  requestConfirmation(email) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) =>
      user.forgotPassword({
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      })
    );
  }

  changePassword(code, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: this.state.phone, Pool: userPool });

    return new Promise((resolve, reject) =>
      user.confirmPassword(code, password, this, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      })
    );
  }

  handleOnChange = (value) =>  {
    this.setState({
       phone: value
    });
 }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await this.requestConfirmation(this.state.phone);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    this.setState({ isLoading: false, enterCodeScreen: true });
  }

  handleCodeSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      this.changePassword(this.state.code, this.state.newPassword);

    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    this.setState({ isLoading: false })
    this.props.history.push("/login");
  }

  renderUsernameEntry() {
    return(
      <React.Fragment>
        <Row Style={"padding-top: 60px;"}>
          <Col sm={3} md={3}></Col>
          <Col sm={6} md={6}>
        <Panel>
          <div className="page-header">Enter your phone number</div>
          <FormGroup controlId="phone">
          <ControlLabel >Phone Number</ControlLabel>
          <ReactPhoneInput Style={"border-radius:40px;"}
          defaultCountry={'ug'} 
          onChange={this.handleOnChange}
          value={this.state.phone}
          onlyCountries={['ug']}
          type="text"
          />
        </FormGroup>
        <LoaderButton
          block
          disabled={ ! this.validateForm() }
          isLoading={this.state.isLoading}
          text="Request Confirmation Code"
          loadingText="Requesting"
          onClick={this.handleSubmit}
        />
        </Panel>
        </Col>
        <Col sm={3} md={3}></Col>
        </Row>
      </React.Fragment>
    )
  }

  renderCodeEntry() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}></Col>
        <Col sm={6} md={6}>
        <Panel>
        <PageHeader>Reset Password</PageHeader>
        <h1>Please check your email for a code that you will enter below, along with your new password, to authorize your password reset.</h1>
        <FormGroup controlId="code" bsSize="large">
          <ControlLabel>Access Code</ControlLabel>
          <FormControl
            autoFocus
            type="number"
            value={this.state.code}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="newPassword" bsSize="large">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.newPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={ ! this.validatePasswordForm() }
          isLoading={this.state.isLoading}
          text="Change Password"
          loadingText="Updating"
          onClick={this.handleCodeSubmit}
        />
        </Panel>
        </Col>
        <Col sm={3} md={3}></Col>
        </Row>
      </React.Fragment>
    )
  }


  render() {
    return(
      <React.Fragment>
        { this.state.enterCodeScreen === false
        ? this.renderUsernameEntry()
      : this.renderCodeEntry() }
      </React.Fragment>
    )
  }
}
