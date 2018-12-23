import React, { Component } from "react";
import { PageHeader, Row } from "react-bootstrap";
import ProfileForm from "./ProfileForm";

export default class NewProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      username: null,
      accessToken: "",
      userToken: "",

    }
  }

  async componentDidMount() {
    console.log('We need to pull the phone number attribute from the created token and use to create an entry in the database')
  }

  createProfile = (firstName, lastName, email, dob, address, city) => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}/user`, {
      method: 'POST',
      body: JSON.stringify({
        id: this.props.username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        phone: this.props.phone,
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
      this.props.history.push('/profile/picture')
    })
    .catch((error) => {
      document.getElementById('database-failure').click();
      console.log('The Profile Failed to Update', error)
    })
  }

  render() {
    return(
    <React.Fragment>
      <Row style={{paddingTop:"80px"}}>
      <PageHeader>Create Profile<br/><small>Please fill in every form.</small></PageHeader>
      <ProfileForm
        condition="NEW"
        handleProfile={this.createProfile}
        validate={true}
        history={this.props.history}
        getProfileInfo={this.props.getProfileInfo}
        profile={this.props.profile}
      />
      </Row>
    </React.Fragment>
    )
  }
}
