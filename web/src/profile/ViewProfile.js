import React, { Component } from 'react';
import {
  Image, FormGroup, ControlLabel,
  Grid, Row, Col, Button, ButtonToolbar,
} from 'react-bootstrap';
import ListReviews from '../reviews/ListReviews';

export default class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
    };
  }

  componentDidMount() {
    const userId = window.location.pathname.replace('/profile/', '');
    fetch(`${process.env.REACT_APP_PROD_SERVER}/user/${userId}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken,
      },
    })
      .then((res) => {
        const response = res.json();
        response.then((result) => {
          this.setState({
            profile: result,
          });
        });
      });
  }

  renderPhoto() {
    const link = `https://s3.eu-central-1.amazonaws.com/wr-uploads/${this.state.profile.id}`;
    return (
      <Image src={link} rounded height="180" width="160" />
    );
  }

  render() {
    const pushStyle = {
      textAlign: 'center',
    };

    const loginStyle = { backgroundColor: '#ffeb3b', color: 'gray' };

    const userId = window.location.pathname.replace('/profile/', '');


    // const btn ={backgroundColor: '#fdd835', color: 'black'};

    return (
      <div className="Profile">
        <Grid>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <div style={pushStyle}>
                {this.renderPhoto()}
              </div>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <div style={pushStyle}>
                <h1>
                  {this.state.profile.firstName}
                  {' '}
                  {this.state.profile.lastName}
                </h1>
                <h1>
                  {this.state.profile.rate}
                  {' '}
UGX/Hr
                </h1>
                <br />
                <ListReviews user={userId} />
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <div style={pushStyle}>
              <Col xs={6} md={6} lg={6}>
                <h1>{this.state.profile.city}</h1>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <h1>{this.state.profile.industry}</h1>
              </Col>
            </div>
          </Row>


          <Row className="summary-skills-group">
            <Col xs={12} md={6} lg={6}>
              <FormGroup controlId="summary">
                <ControlLabel>Personal Summary</ControlLabel>
                <div style={pushStyle}>
                  <p>{this.state.profile.bio}</p>
                </div>
              </FormGroup>
            </Col>
            <Col xs={12} md={6} lg={6}>

              <FormGroup controlId="skills">
                <ControlLabel>Skills</ControlLabel>
                <div>
                  {/* RENDER CONDITIONALY IN THE FUTURE */}
                  <ButtonToolbar>
                    <Button bsSize="large" style={loginStyle}>{this.state.profile.userPrimarySkill}</Button>
                    <Button bsSize="large" style={loginStyle}>{this.state.profile.userSecondarySkill}</Button>
                    <Button bsSize="large" style={loginStyle}>{this.state.profile.userTertiarySkill}</Button>
                  </ButtonToolbar>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
