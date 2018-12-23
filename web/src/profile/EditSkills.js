import React , { Component } from "react";
import { PageHeader } from "react-bootstrap";
import SkillsForm from "./SkillsForm";

export default class EditSkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    }
  }

// Finish editing Profile information to match the contacts, and new component layout

  editSkills = (primary, secondary, tertiary) => {

    this.props.setProfileInfo({
      ...this.props.profile,
      userPrimarySkill: primary,
      userSecondarySkill: secondary,
      userTertiarySkill: tertiary
    });

    fetch(`${process.env.REACT_APP_PROD_SERVER}/user/${this.props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        userPrimarySkill: primary,
        userSecondarySkill: secondary,
        userTertiarySkill: tertiary
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
      <PageHeader>Edit Skills</PageHeader>
      <SkillsForm
        handleSkills={this.editSkills}
        profile={this.props.profile}
        industries={this.props.industries}
        parentComponent='EditSkills'
      />
    </React.Fragment>
    );
  }
}
