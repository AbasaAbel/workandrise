import React, { Component } from "react";
import { Image, FormGroup, ControlLabel,
      Grid, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import ListReviews from "../reviews/ListReviews";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      profile: {},
    };
  }

  handleEditProfile = () => {
    this.props.history.push("/profile/edit");
  }

  renderPhoto() {
    const link = `https://s3.eu-central-1.amazonaws.com/wr-uploads/${this.props.username}`
      return(
        <Image src={link} rounded height="180" width="160" />
      )
  }

  render() {

    const pushStyle = {
      textAlign: 'center',
      // fontWeight: '900'
    }

    const loginStyle = {color: 'gray'}

    const boldStyle = {
      fontWeight: 'bold'
    }

    return (
      <div className="Profile">
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <div className="photo" style={pushStyle}>
                {this.renderPhoto() }
                <br /><br />
                <ListReviews user={this.props.username}/>
            </div>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <div className ="name" style={pushStyle}>
                  <h1><i class="fas fa-user"></i> {this.props.profile.firstName} {this.props.profile.lastName}</h1>
              </div>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <div>
                <h1>{this.props.profile.phone}</h1>
                <h1>{this.props.profile.city}, Uganda</h1>
              </div>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <div>
                <h1>{this.props.profile.rate} UGX/Hr</h1>
                <h1>Field - {this.props.profile.industry}</h1>
              </div>
            </Col>
          </Row>
          <Row className="summary-skills-group">
            <Col xs={12} md={6} lg={6}>
            <FormGroup controlId="summary">
              <ControlLabel style={boldStyle}>Personal Summary</ControlLabel>
              <div style={pushStyle}>
                <p>{this.props.profile.bio}</p>
              </div>
            </FormGroup>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <FormGroup controlId="skills">
                <ControlLabel>Skills</ControlLabel>
              <ul class="list-group">
                <li style={loginStyle}>{this.props.profile.userPrimarySkill}</li>
                <li style={loginStyle}>{this.props.profile.userSecondarySkill}</li>
                <li style={loginStyle}>{this.props.profile.userTertiarySkill}</li>
              </ul>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <div style={pushStyle}>
            <Col style={{marginTop: '5px'}} xs={12} md={12} lg={12}>
              <LoaderButton
                block
                bsSize="large"
                onClick={this.handleEditProfile}
                isLoading={this.state.isLoading}
                text="Edit Profile"
                loadingText="Please Wait..."
              />
            </Col>
          </div>
          </Row>
      </Grid>
      </div>
    );
  }
}
