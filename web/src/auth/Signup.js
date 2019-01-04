import React, { Component } from "react";
import { Col, HelpBlock, FormGroup, FormControl, ControlLabel, PageHeader } from "react-bootstrap";
import LoaderButton from '../components/LoaderButton';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";
import ReactPhoneInput from "react-phone-input-2";
import config from "../config";
import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      phone: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      user: null,
      reset: false

    };

  }
  
  
  validateForm() {
    return(
      this.state.phone.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
      );
    }
    
    validateConfirmationForm() {
      return this.state.confirmationCode.length > 0;
    }
    
    handleChange = event => {
      this.setState({
        [event.target.id] : event.target.value
      })
    }
    
    handleOnChange = (value) =>  {
      this.setState({
        phone: value
      });
    }
    
    handleForgotPassword = () => {
      try {
        this.props.history.push("/reset");
      }
      catch(e) {
        alert(e);
      }
    }

    linkToProfile = () => {
      this.props.history.replace("/profile/new");
      window.location.reload();
    }


  renderSubmit = () => {
    alert('Re-enter your phone & password, then re-request your code.')
    this.setState({
      reset: true
    })
  }

  
    
    

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const user = await this.signup(this.state.phone, this.state.password);
      this.setState({
        user: user
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }


  handleCodeSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true, reset: true });
    

    try {
      const userPool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
      });
  
      const info = new CognitoUser({ Username: this.state.phone, Pool: userPool });
      const user = await this.resend(info);
      this.setState({
        user: 'user'
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }


  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.user, this.state.confirmationCode);
      const userToken = await this.authenticate(
        this.state.user,
        this.state.phone,
        this.state.password
      );
      this.props.updateUserToken(userToken);
      this.props.history.push("/profile/new");
      window.location.reload();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
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

  signup(phone, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    return new Promise((resolve, reject) =>
      userPool.signUp(phone, password, [], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
    resolve(result.user);
  })
);
}

confirm(user, confirmationCode) {
  return new Promise((resolve, reject) =>
  user.confirmRegistration(confirmationCode, true, function(err, result) {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  })
);
}

confirmUnauthenticated(user, confirmationCode) {
  return new Promise((resolve, reject) =>
  user.confirmRegistration(confirmationCode, true, function(err, result) {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  })
);
}

resend(user, confirmationCode) {
  return new Promise((resolve, reject) =>
  user.resendConfirmationCode(confirmationCode, true, function(err, result) {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  })
);
}

authenticate(user, phone, password) {
  const authenticationData = {
    Username: phone,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
  user.authenticateUser(authenticationDetails, {
    onSuccess: result => resolve(),
    onFailure: err => reject(err)
  })
);
}

  renderConfirmationForm() {
    return (
      <div>
        <Col sm={3} md={3}></Col>
        <Col sm={6} md={6}>
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange} />
          <HelpBlock>Please check your phone for the code.</HelpBlock>
        </FormGroup>

        <LoaderButton
          block
          bsSize="large"
          disabled={ ! this.validateConfirmationForm() }
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying..." /> 
      </form>
      </Col>
      <Col sm={3} md={3}></Col>
      </div>
    );
  }

  renderForm() {
    return(
      <div>
        <Col sm={6} md={6}>
      <div className="card">
        <PageHeader><center>Sign up / Register</center></PageHeader>
      <div className="card-body">
      <form style={{padding:5}} onSubmit={this.handleSubmit}>
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
        <FormGroup controlId="password">
          {/* <ControlLabel>Password</ControlLabel> */}
          <FormControl Style={"border-radius:40px;"}
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          {/* <ControlLabel>Confirm Password</ControlLabel> */}
          <FormControl Style={"border-radius:40px;"}
          placeholder="Confirm Password."
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <p>Your password must contain at least 1 small letter, 1 capital letter, &amp; one number.</p>
        {this.state.reset === false ? (
          <React.Fragment>

            <LoaderButton
              block
              disabled={!this.validateForm()}
              isLoading=""
              text="Register"
              loadingText="Logging in"
              onClick={this.handleSubmit}
            />
            <LoaderButton
            block
            isLoading={this.state.isLoading}
            text="Did not receive confirmation code?"
            loadingText="Loading.."
            onClick={this.renderSubmit}
          />
          </React.Fragment>
        ): (
          <LoaderButton
            block
            disabled={!this.validateForm()}
            isLoading=""
            text="Re-request Code"
            loadingText="Requesting"
            onClick={this.handleCodeSubmit}
          />
        )}
      </form>
      
      </div>
      </div>
      </Col>
      <Col sm={3} md={3}></Col>
      </div>
    )
  }

  render() {
    return (

      <div className="Signup">
        {this.state.user === null
          ? this.renderForm() 
          : this.renderConfirmationForm()
        }
      </div>
    );
  }
}
