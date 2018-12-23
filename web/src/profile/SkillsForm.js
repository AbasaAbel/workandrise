import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class SkillsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndustry: "",
      choosableSkills: ["Select"],
      userPrimarySkill: null,
      userSecondarySkill: null,
      userTertiarySkill: null,
      isLoading: false,
    }
  }

  componentDidMount() {
    if (this.props.parentComponent === 'NewJob') {
      this.handleIndustryChange(this.props.industry);
    }
    if (this.props.parentComponent === 'EditSkills') {
      this.setState({
        userPrimarySkill: this.props.profile.userPrimarySkill,
        userSecondarySkill: this.props.profile.userSecondarySkill,
        userTertiarySkill: this.props.profile.userTertiarySkill
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.parentComponent === 'NewJob') {
      this.handleIndustryChange(nextProps.industry);
    }
  }

  handleSubmit = (event) => {

    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.props.handleSkills(
        this.state.userPrimarySkill,
        this.state.userSecondarySkill,
        this.state.userTertiarySkill
      )
      this.setState({ isLoading: false });
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleIndustryChange(industry) {
    if (industry === 'Select') {
      this.setState({
        currentIndustry: ""
      });
    }
    else {
      this.setState({
        currentIndustry: industry
      });
      this.generateSkills(industry);
    }
  }

  handleSkillChange(skill, num) {
    if (num === 1) {
      if (skill === 'Select') {
        this.setState({
          userPrimarySkill: null
        });
      }
      else {
        this.setState({
          userPrimarySkill: skill
        });
      }
    }
    if (num === 2) {
      if (skill === 'Select') {
        this.setState({
          userSecondarySkill: null
        });
      }
      else {
        this.setState({
          userSecondarySkill: skill
        });
      }
    }
    if (num === 3) {
      if (skill === 'Select') {
        this.setState({
          userTertiarySkill: null
        });
      }
      else {
        this.setState({
          userTertiarySkill: skill
        });
      }
    }
  }

  // GENERATES SKILL SELECTION BASED ON CHOSEN INDUSTRY
  generateSkills(industry) {
    let industries = this.props.industries;
    switch(industry) {
      case Object.keys(industries[0])[0]:
        this.setState({
          choosableSkills: Object.values(industries[0])[0]
        });
        break;
      case Object.keys(industries[1])[0]:
        this.setState({
          choosableSkills: Object.values(industries[1])[0]
        });
        break;
      case Object.keys(industries[2])[0]:
        this.setState({
          choosableSkills: Object.values(industries[2])[0]
        });
        break;
      case Object.keys(industries[3])[0]:
        this.setState({
          choosableSkills: Object.values(industries[3])[0]
        });
        break;
      case Object.keys(industries[4])[0]:
        this.setState({
          choosableSkills: Object.values(industries[4])[0]
        });
        break;
      case Object.keys(industries[5])[0]:
        this.setState({
          choosableSkills: Object.values(industries[5])[0]
        });
        break;
      case Object.keys(industries[6])[0]:
        this.setState({
          choosableSkills: Object.values(industries[6])[0]
        });
        break;
      case Object.keys(industries[7])[0]:
        this.setState({
          choosableSkills: Object.values(industries[7])[0]
        });
        break;
      case Object.keys(industries[8])[0]:
        this.setState({
          choosableSkills: Object.values(industries[8])[0]
        });
        break;
      case Object.keys(industries[9])[0]:
        this.setState({
          choosableSkills: Object.values(industries[9])[0]
        });
        break;
        case Object.keys(industries[10])[0]:
          this.setState({
            choosableSkills: Object.values(industries[10])[0]
          });
          break;
        case Object.keys(industries[11])[0]:
            this.setState({
              choosableSkills: Object.values(industries[11])[0]
            });
            break;
            case Object.keys(industries[12])[0]:
                this.setState({
                  choosableSkills: Object.values(industries[12])[0]
                });
                break;
      default:
        this.setState({
          choosableSkills: ['Select']
        });
        break;
    }
  }

  // FORMATS INDUSTRY SKILLS FOR DROPDOWN MENUS
  populateSkills(formNum) {
    // FORMAT SPECIFIC DROPDOWNS
    if (formNum === 1) {

      let skillList = this.state.choosableSkills.map((skill, inc) => {
        if (this.state.userPrimarySkill !== skill) {
          return <option key={inc+1} value={skill}>{skill}</option>
        }
        return null;
      });

      let holderSkill;

      if (this.state.userPrimarySkill !== undefined && this.state.userPrimarySkill !== null) {
        holderSkill = <option key={0} value={this.state.userPrimarySkill}>{this.state.userPrimarySkill}</option>
      }
      else {
        holderSkill = <option key={0} value='Select'>Select</option>
      }
      return [holderSkill, skillList];
    }

    if (formNum === 2) {

      let skillList = this.state.choosableSkills.map((skill, inc) => {
        if (this.state.userSecondarySkill !== skill) {
          return <option key={inc+1} value={skill}>{skill}</option>
        }
        return null;
      });

      let holderSkill;
      if (this.state.userSecondarySkill !== undefined && this.state.userSecondarySkill !== null) {
        holderSkill = <option key={0} value={this.state.userSecondarySkill}>{this.state.userSecondarySkill}</option>
      }
      else {
        holderSkill = <option key={0} value='Select'>Select</option>
      }

      return [holderSkill, skillList];
    }

    if (formNum === 3) {

      let skillList = this.state.choosableSkills.map((skill, inc) => {
        if (this.state.userTertiarySkill !== skill) {
          return <option key={inc+1} value={skill}>{skill}</option>
        }
        return null;
      });

      let holderSkill;

      if (this.state.userTertiarySkill !== undefined && this.state.userTertiarySkill !== null) {
        holderSkill = <option key={0} value={this.state.userTertiarySkill}>{this.state.userTertiarySkill}</option>
      }
      else {
        holderSkill = <option key={0} value='Select'>Select</option>
      }
      return [holderSkill, skillList];
    }
  }

  // FORMATS INDUSTRY SKILLS FOR DROPDOWN MENUS
  populateFormSkills() {
    let skillList = this.state.choosableSkills.map((skill, inc) => {
      return <option key={inc} value={skill}>{skill}</option>
    });
    return skillList;
  }

  // GENERATES THE FORMS FOR RENDER FUNCTION
  generateSkillForms() {

      // DISABLES SKILL DROPDOWNS UNTIL INDUSTRY IS CHOSEN
      let disableDropdown = true;
      if (this.state.currentIndustry !== "") {
        disableDropdown = false;
      }

    // POPULATES THE SKILL FORMS WITH SKILLS
    let skills1 = this.populateSkills(1);
    let skills2 = this.populateSkills(2);
    let skills3 = this.populateSkills(3);

    let handler = (e, num) => this.handleSkillChange(e.target.value, num);

    if (this.props.parentComponent === 'NewJob') {
      handler = (e, num) => this.props.handleSkill(e.target.value, num);
    }

    let values = (num) => {
      if (this.props.parentComponent === 'NewJob') {
        if (num === 1) {
          return this.props.skills[0];
        }
        if (num === 2) {
          return this.props.skills[1];
        }
        if (num === 3) {
          return this.props.skills[2];
        }
      }
      else {
        if (num === 1) {
          return this.state.userPrimarySkill ? this.state.userPrimarySkill : "Select"
        }
        if (num === 2) {
          return this.state.userSecondarySkill ? this.state.userSecondarySkill : "Select"
        }
        if (num === 3) {
          return this.state.userTertiarySkill ? this.state.userTertiarySkill : "Select"
        }
      }
    }

    let forms =
      <React.Fragment>
        <FormGroup controlId="primarySkill">
          <ControlLabel>Skill 1</ControlLabel>
          <FormControl componentClass="select"
            onChange={(e) => handler(e, 1)}
            value={ values(1) } disabled={disableDropdown}>
              {skills1}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="secondarySkill">
          <ControlLabel>Skill 2</ControlLabel>
          <FormControl componentClass="select"
            onChange={(e) => handler(e, 2)}
            value={ values(2) } disabled={disableDropdown}>
              {skills2}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="tertiarySkill">
          <ControlLabel>Skill 3</ControlLabel>
          <FormControl componentClass="select"
            onChange={(e) => handler(e, 3)}
            value={ values(3) } disabled={disableDropdown}>
              {skills3}
          </FormControl>
        </FormGroup>
        </React.Fragment>

    if (this.props.parentComponent === 'NewJob') {
      return forms;
    }
    else {
      return <React.Fragment><FormGroup controlId="industry">
      <ControlLabel>Industry</ControlLabel>
      <FormControl componentClass="select" onChange={(e) => this.handleIndustryChange(e.target.value)} value={this.state.industry}>
        <option value="Select">Select Industry</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Construction">Private Construction</option>
        <option value="Engineering">Engineering</option>
        <option value="Professional">Professional Services</option>
        <option value="Creative-arts">Creative Arts</option>
        <option value="Technology">Technology</option>
        <option value="Software-Development">Software Development</option>
        <option value="Tourism">Tourism</option>
        <option value="Food-Service">Food Service</option>
        <option value="Writing">Writing</option>
        <option value="Legal">Legal</option>
        <option value="Sales-Marketing">Sales & Marketing</option>
        <option value="Translation">Translation</option>

      </FormControl>
    </FormGroup>
    {forms}
    <LoaderButton
          block
          bsSize="large"
          onClick={this.handleSubmit}
          isLoading={this.state.isLoading}
          text="Submit Skills"
          loadingText="Editing..."
        />
    </React.Fragment>
    }
  }

  render() {

    let forms = this.generateSkillForms();

    return(
      <React.Fragment>
        {forms}
      </React.Fragment>
    )
  }
}
