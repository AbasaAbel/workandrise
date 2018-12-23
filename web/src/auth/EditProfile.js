import React , { Component } from "react";
import { PageHeader, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import ProfileForm from "./ProfileForm";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.picture = null;

    this.state = {
      isLoading: null,

      username: null,
      accessToken: "",
      userToken: "",

    }
  }

  handleUploadPicture = () => {
    this.props.history.push("/profile/picture")
  }

  handleEditSkills = () => {
    this.props.history.push("/profile/skills");
  }

// Finish editing Profile information to match the contacts, and new component layout

  editProfile = (rate, industry, bio, email, edLevel, degree, language1, language2, language3, address, city) => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}/user/${this.props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        rate: rate,
        industry: industry,
        bio: bio,
        email: email,
        edLevel: edLevel,
        degree: degree,
        language1: language1,
        language2: language2,
        language3: language3,
        address: address,
        city: city,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken
      },
    }).then((responseText) => {
      document.getElementById('database-success').click();
      this.props.getProfileInfo();
      this.props.history.replace('/profile')
    })
    .catch((error) => {
      document.getElementById('database-failure').click();
    })
  }


  render() {
    return(
      <React.Fragment>
      <PageHeader>Edit Profile</PageHeader>
      <Row>
        <Col style={{paddingRight: '2.5px'}} xs={6} md={6} lg={6}>
          <LoaderButton
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            onClick={this.handleUploadPicture}
            isLoading={this.state.isLoading}
            text="Edit Picture"
            loadingText="Please Wait..."
          />
        </Col>
        <Col style={{paddingLeft: '2.5px'}} xs={6} md={6} lg={6}>
          <LoaderButton
            block
            bsSize="large"
            onClick={this.handleEditSkills}
            isLoading={this.state.isLoading}
            text="Edit Skills"
            loadingText="Please Wait..."
          />
        </Col>
      </Row>
      <br />
      <ProfileForm
        condition="EDIT"
        handleProfile={this.editProfile}
        validate={false}
        history={this.props.history}
        setProfileInfo={this.props.setProfileInfo}
        profile={this.props.profile}
      />

    </React.Fragment>
    );
  }
}
