import React, { Component } from "react";
import { FormGroup, FormControl, PageHeader, Row, Col, ControlLabel } from "react-bootstrap";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import LoaderButton from "../components/LoaderButton";
import ReactPhoneInput from "react-phone-input-2"
import config from "../config";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      phone: "",
      password: ""
    };
  }


  login(phone, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const user = new CognitoUser({ Username: phone, Pool: userPool });
    const authenticationData = { Username: phone, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result.getIdToken().getJwtToken()),
        onFailure: err => reject(err)
      })
    );
  }

  validateForm() {
    return this.state.phone.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
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
      const userToken = await this.login(this.state.phone, this.state.password);
      this.props.updateUserToken(userToken);
      this.props.history.push("/");
      window.location.reload();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleForgotPassword = () => {
    try {
      this.props.history.push("/reset");
    }
      catch(e) {
        alert(e);
      }
  }

  render() {

    return (
      <div>
        <Col sm={4} md={4}></Col>
        <Col sm={4} md={4}>
      <div className="card">
      <div className="card-body">
      <PageHeader><center>Login</center></PageHeader>
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="phone" >
            <ControlLabel>Phone</ControlLabel>
            <ReactPhoneInput               
              defaultCountry={'ug'} 
              onChange={this.handleOnChange}
              value={this.state.phone}
              onlyCountries={['ug']}
              type="text"
           />
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              Style={"border-radius:40px;"}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
        <LoaderButton
          block
          disabled={ ! this.validateForm() }
          isLoading={this.state.isLoading}
          text="Login"
          loadingText="Logging in"
          onClick={this.handleSubmit}
        />
        </form>
        <LoaderButton
          block
          isLoading={this.state.isLoading}
          text="Forgot Password?"
          loadingText="Loading.."
          onClick={this.handleForgotPassword}
        />
        </div>
        </div>
      </div>
      </Col>
      <Col sm={4} md={4}></Col>
      </div>
    );
  }
}
