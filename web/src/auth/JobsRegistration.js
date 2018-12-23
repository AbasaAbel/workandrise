import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class JobsRegistration extends Component {

  constructor(props) {
    super(props);


    this.state = {
      rate: "",
      industry: "",
      otherIndustry: "",
      userPrimarySkill: "",
      userSecondarySkill: "",
      userTertiarySkill: "",
      otherSkills: "",
      languagesSpoken: "",
      weeklyAvail: ""
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  //function to register a job seeker
  registerJobSeeker = () => {
    //logic to handle the submission of job seeker
    console.log(this.state);
  }

  renderEmployeeRegistrationForm() {
    return(
      <Row >
      <div className="card">
        <div className="card-body" >
        <center><h4>This information shall help us easily connect you with employers</h4></center>
          <form>

            <FormGroup controlId="rate">
              <ControlLabel>Payment per hour</ControlLabel>
              <FormControl
                type="number"
                value={this.state.rate}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="Your desired wage per hour e.g 10000"
              />
            </FormGroup>

                <FormGroup controlId="industry">
                <ControlLabel>Primary Industry</ControlLabel>
                <FormControl componentClass="select"
                      Style={"border-radius:40px;"} onChange={this.handleChange} value={this.state.industry}>
                  <option value="Select">Select your primary Industry</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Construction">Private Construction</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Professional">Professional Services</option>
                  <option value="Creative-arts">Creative Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Software-Development">Software Development</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Food-Service">Food Service</option>
                </FormControl>
              </FormGroup>


            <FormGroup controlId="otherIndustry">
              <ControlLabel>Other Industry</ControlLabel>
              <FormControl
                type="text"
                value={this.state.otherIndustry}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="E.g. Education"
              />
            </FormGroup>

            <FormGroup controlId="bio">
              <ControlLabel>Bio</ControlLabel>
              <FormControl
                type="textarea"
                value={this.state.bio}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="Tell us about yourself"
              />
            </FormGroup>

            <FormGroup controlId="maxEducationLevel">
              <ControlLabel>Level of Education</ControlLabel>
              <FormControl
                type="text"
                value={this.state.maxEducationLevel}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="E.g. PhD, Masters, Degree"
              />
            </FormGroup>

            <FormGroup controlId="userPrimarySkill">
            <ControlLabel>Primary Skill</ControlLabel>
            <FormControl componentClass="select" 
                  Style={"border-radius:40px;"} 
                  onChange={this.handleChange} 
                  value={this.state.userPrimarySkill}>
              <option value="select">Select Your Primary Skill</option>
              <option value="Skill 1">Skill 1</option>
              <option value="Skill 2">Skill 2</option>
              <option value="Skill 3">Skill 3</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="userSecondarySkill">
            <ControlLabel>Secondary Skill</ControlLabel>
            <FormControl componentClass="select" 
                  Style={"border-radius:40px;"} 
                  onChange={this.handleChange} 
                  value={this.state.userSecondarySkill}>
              <option value="select">Select Secondary Skill</option>
              <option value="Skill 1">Skill 1</option>
              <option value="Skill 2">Skill 2</option>
              <option value="Skill 3">Skill 3</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="userTertiarySkill">
            <ControlLabel>Tertiary Skill</ControlLabel>
            <FormControl componentClass="select" 
                  Style={"border-radius:40px;"} 
                  onChange={this.handleChange} 
                  value={this.state.userTertiarySkill}>
              <option value="select">Select Your Tertiary Skill</option>
              <option value="Skill 1">Skill 1</option>
              <option value="Skill 2">Skill 2</option>
              <option value="Skill 3">Skill 3</option>
            </FormControl>
          </FormGroup>
            
            <FormGroup controlId="otherSkills">
              <ControlLabel>Other Skills</ControlLabel>
              <FormControl
                type="textarea"
                value={this.state.otherSkills}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="E.g. Programming"
              />
            </FormGroup>

            <FormGroup controlId="languagesSpoken">
              <ControlLabel>Languages</ControlLabel>
              <FormControl
                type="textarea"
                value={this.state.languagesSpoken}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="The languages you speak e.g English, Luganda"
              />
            </FormGroup>

            <FormGroup controlId="weeklyAvail">
              <ControlLabel>No. of days you work in a week</ControlLabel>
              <FormControl
                type="number"
                value={this.state.weeklyAvail}
                onChange={this.handleChange} Style={"border-radius:40px;"}
                placeholder="E.g. 5"
              />
            </FormGroup>

          </form>
        </div>
      </div>
      <Col sm={3} md={3}></Col>
      </Row>
    )
  }

  render() {
    return(this.renderEmployeeRegistrationForm())
    }

}
