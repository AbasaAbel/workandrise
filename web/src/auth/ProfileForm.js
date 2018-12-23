import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      username: "",

      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      rate: "",
      address: "",
      industry: "",
      bio: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }



  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  validateForm() {
    if (this.props.condition === "NEW") {
    return this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.address.length > 0 && this.state.email.length > 0;
  } else {
    return true;
  }
  }



  handleNewSubmit = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.props.handleProfile(
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.dob,
        this.state.address,
        this.state.city,
      )

    }
    catch(e) {
      alert(e);
    }
  }

  handleEditSubmit = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.props.handleProfile(
        this.state.rate,
        this.state.industry,
        this.state.bio,
        this.state.edLevel,
        this.state.degree,
        this.state.language1,
        this.state.language2,
        this.state.language3,
        this.state.address,
        this.state.city
      )
    }
    catch(e) {
      alert(e);
    }
  }

  renderNewProfile() {
    return(
      <React.Fragment>
        <Row style={{paddingTop:"90px"}}>
          <FormGroup controlId="first_name" >
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.first_name}
              type="text"
              placeholder={this.props.profile.firstName}
            />
          </FormGroup>

     <FormGroup controlId="last_name" >
       <ControlLabel>Last Name</ControlLabel>
       <FormControl
         onChange={this.handleChange}
         value={this.state.last_name}
         type="text"
         placeholder={this.props.profile.lastName} />
    </FormGroup>

    <FormGroup controlId="email" >
      <ControlLabel>Primary Email</ControlLabel>
      <FormControl
        onChange={this.handleChange}
        value={this.state.email}
        type="text"
        placeholder={this.props.profile.email} />
   </FormGroup>

   <FormGroup controlId="dob" >
     <ControlLabel>Date of Birth</ControlLabel>
     <FormControl
       onChange={this.handleChange}
       value={this.state.dob}
       type="date"
       placeholder={this.props.profile.dob} />
  </FormGroup>

    <FormGroup controlId="address" >
      <ControlLabel>Address</ControlLabel>
      <FormControl
        onChange={this.handleChange}
        value={this.state.address}
        type="text"
        placeholder={this.props.profile.address} />
   </FormGroup>

   <FormGroup controlId="city">
     <ControlLabel>City</ControlLabel>
     <FormControl componentClass="select" onChange={this.handleChange} value={this.state.city}>
       <option value="select">Select Your City</option>
       <option value="Kampala">Kampala</option>
       <option value="Gulu">Gulu</option>
       <option value="Lira">Lira</option>
       <option value="Mbarara">Mbarara</option>
       <option value="Jinja">Jinja</option>
       <option value="Bwizibwera">Bwizibwera</option>
       <option value="Mbale">Mbale</option>
       <option value="Mukono">Mukono</option>
       <option value="Kasese">Kasese</option>
       <option value="Masaka">Masaka</option>
     </FormControl>
   </FormGroup>

   {/* <FormGroup controlId="country">
     <ControlLabel>Country</ControlLabel>
     <FormControl componentClass="select" onChange={this.handleChange} value={this.state.country}>
       <option value="select">Options</option>
       <option value="Uganda">Uganda</option>
     </FormControl>
   </FormGroup> */}

   <LoaderButton
     block
     disabled={!this.validateForm()}
     onClick={this.handleNewSubmit}
     isLoading={this.state.isLoading}
     text="Submit Profile"
     loadingText="Processing..."
   />
   </Row>
 </React.Fragment>
    )
  }

  renderEditProfile() {
    return(
      <React.Fragment>
<Row style={{paddingTop:"60px"}}>
   <FormGroup controlId="rate" >
     <ControlLabel>Hourly Rate (UGX)</ControlLabel>
     <FormControl
       onChange={this.handleChange}
       value={this.state.rate}
       type="number"
       placeholder={this.props.profile.rate} />
  </FormGroup>

  <FormGroup controlId="industry">
    <ControlLabel>Industry</ControlLabel>
    <FormControl componentClass="select" onChange={this.handleChange} value={this.state.industry}>
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
    </FormControl>
  </FormGroup>

  {/* <FormGroup controlId="resume" >
    <ControlLabel>Resume</ControlLabel>
    <FormControl
      onChange={this.handleFileChange}
      type="file" />
  </FormGroup> */}

  <FormGroup controlId="bio" >
    <ControlLabel>Personal Summary</ControlLabel>
    <FormControl
      onChange={this.handleChange}
      value={this.state.bio}
      componentClass="textarea"
      placeholder="Here you can talk about your experiences, skills, & previous projects you have worked on that will help you stand out." />
  </FormGroup>

  <FormGroup controlId="email" >
    <ControlLabel>Primary Email</ControlLabel>
    <FormControl
      onChange={this.handleChange}
      value={this.state.email}
      type="text"
      placeholder={this.props.profile.email} />
 </FormGroup>

 <FormGroup controlId="edlLevel">
   <ControlLabel>Highest Education</ControlLabel>
   <FormControl componentClass="select" onChange={this.handleChange} value={this.state.edLevel}>
     <option value="Options">Options</option>
     <option value="Graduate">Graduate</option>
     <option value="Undergraduate">Undergraduate</option>
     <option value="College">College</option>
     <option value="A-Level">A-Level</option>
     <option value="O-Level">O-Level</option>
   </FormControl>
 </FormGroup>

 <FormGroup controlId="degree">
   <ControlLabel>Degree</ControlLabel>
   <FormControl componentClass="select" onChange={this.handleChange} value={this.state.degree}>
     <option value="Options">Options</option>
     <option value="Tourism">Tourism</option>
     <option value="Business Administration">Business Administration</option>
     <option value="Computer Science">Computer Science</option>
     <option value="Engineering">Engineering</option>
     <option value="Law">Law</option>
     <option value="Political Science">Political Science</option>
     <option value="Medicine">Medicine</option>
     <option value="Other">Other</option>
   </FormControl>
 </FormGroup>

 <FormGroup controlId="language1">
   <ControlLabel>Primary Language</ControlLabel>
   <FormControl componentClass="select" onChange={this.handleChange} value={this.state.language1}>
     <option value="Options">Options</option>
     <option value="English">English</option>
     <option value="Runyankore (Bantu)">Runyankore (Bantu)</option>
     <option value="Rutooro (Bantu)">Rutooro (Bantu)</option>
     <option value="Rukiga (Bantu)">Rukiga (Bantu)</option>
     <option value="Runyoro (Bantu)">Runyoro (Bantu)</option>
     <option value="Luganda (Bantu)">Luganda (Bantu)</option>
     <option value="Lusoga (Bantu)">Lusoga (Bantu)</option>
     <option value="Lussese (Bantu)">Lussese (Bantu)</option>
     <option value="Karamojong (Eastern Sudanic)">Karamojong (Eastern Sudanic)</option>
     <option value="Bari (Eastern Sudanic)">Bari (Eastern Sudanic)</option>
     <option value="Teso (Eastern Sudanic)">Teso (Eastern Sudanic)</option>
     <option value="Alur (Western Sudanic)">Alur (Western Nilotic)</option>
     <option value="Acholi (Western Nilotic)">Acholi (Western Nilotic)</option>
     <option value="Lango (Western Nilotic)">Lango (Western Nilotic)</option>
     <option value="Pokot (Nilotic Kalenjin)">Pokot (Nilotic Kalenjin)</option>
     <option value="Elgon (Nilotic Kalenjin)">Elgon</option>
     <option value="Ik (Kuliak)">Ik (Kuliak)</option>
     <option value="Soo (Kuliak)">Soo (Kuliak)</option>
     <option value="Lugbara (Central Sudanic)">Lugbara (Central Sudanic)</option>
     <option value="Aringa (Central Sudanic)">Aringa (Central Sudanic)</option>
     <option value="Ma'di (Central Sudanic)">Ma'di (Central Sudanic)</option>
     <option value="Ndo (Central Sudanic)">Ndo (Central Sudanic)</option>
     <option value="Other">Other</option>
   </FormControl>
 </FormGroup>

 <FormGroup controlId="language2">
   <ControlLabel>Secondary Language</ControlLabel>
   <FormControl componentClass="select" onChange={this.handleChange} value={this.state.language2}>
     <option value="Options">Options</option>
     <option value="English">English</option>
     <option value="Runyankore (Bantu)">Runyankore (Bantu)</option>
     <option value="Rutooro (Bantu)">Rutooro (Bantu)</option>
     <option value="Rukiga (Bantu)">Rukiga (Bantu)</option>
     <option value="Runyoro (Bantu)">Runyoro (Bantu)</option>
     <option value="Luganda (Bantu)">Luganda (Bantu)</option>
     <option value="Lusoga (Bantu)">Lusoga (Bantu)</option>
     <option value="Lussese (Bantu)">Lussese (Bantu)</option>
     <option value="Karamojong (Eastern Sudanic)">Karamojong (Eastern Sudanic)</option>
     <option value="Bari (Eastern Sudanic)">Bari (Eastern Sudanic)</option>
     <option value="Teso (Eastern Sudanic)">Teso (Eastern Sudanic)</option>
     <option value="Alur (Western Sudanic)">Alur (Western Nilotic)</option>
     <option value="Acholi (Western Nilotic)">Acholi (Western Nilotic)</option>
     <option value="Lango (Western Nilotic)">Lango (Western Nilotic)</option>
     <option value="Pokot (Nilotic Kalenjin)">Pokot (Nilotic Kalenjin)</option>
     <option value="Elgon (Nilotic Kalenjin)">Elgon</option>
     <option value="Ik (Kuliak)">Ik (Kuliak)</option>
     <option value="Soo (Kuliak)">Soo (Kuliak)</option>
     <option value="Lugbara (Central Sudanic)">Lugbara (Central Sudanic)</option>
     <option value="Aringa (Central Sudanic)">Aringa (Central Sudanic)</option>
     <option value="Ma'di (Central Sudanic)">Ma'di (Central Sudanic)</option>
     <option value="Ndo (Central Sudanic)">Ndo (Central Sudanic)</option>
     <option value="Other">Other</option>
   </FormControl>
 </FormGroup>

 <FormGroup controlId="language3">
   <ControlLabel>Foreign Language</ControlLabel>
   <FormControl componentClass="select" onChange={this.handleChange} value={this.state.language3}>
     <option value="Options">Options</option>
     <option value="Chinese">Chinese</option>
     <option value="French">French</option>
     <option value="Spanish">Spanish</option>
     <option value="Arabic">Arabic</option>
     <option value="Russian">Russian</option>
     <option value="Other">Other</option>
   </FormControl>
 </FormGroup>

 <FormGroup controlId="address" >
   <ControlLabel>Address</ControlLabel>
   <FormControl
     onChange={this.handleChange}
     value={this.state.address}
     type="text"
     placeholder={this.props.profile.address} />
</FormGroup>

<FormGroup controlId="city">
  <ControlLabel>City</ControlLabel>
  <FormControl componentClass="select" onChange={this.handleChange} value={this.state.city}>
    <option value="select">Select Your City</option>
    <option value="Kampala">Kampala</option>
    <option value="Gulu">Gulu</option>
    <option value="Lira">Lira</option>
    <option value="Mbarara">Mbarara</option>
    <option value="Jinja">Jinja</option>
    <option value="Bwizibwera">Bwizibwera</option>
    <option value="Mbale">Mbale</option>
    <option value="Mukono">Mukono</option>
    <option value="Kasese">Kasese</option>
    <option value="Masaka">Masaka</option>
  </FormControl>
</FormGroup>

{/* <FormGroup controlId="country">
  <ControlLabel>Country</ControlLabel>
  <FormControl componentClass="select" onChange={this.handleChange} value={this.state.country}>
    <option value="select">Options</option>
    <option value="Uganda">Uganda</option>
    <option value="Kenya">Kenya</option>
  </FormControl>
</FormGroup> */}

  <LoaderButton
    block
    bsSize="large"
    disabled={!this.validateForm()}
    onClick={this.handleEditSubmit}
    isLoading={this.state.isLoading}
    text="Edit Profile"
    loadingText="Editing..."
  />
  </Row>
</React.Fragment>
    )
  }

  render() {
    return(
  <React.Fragment>
    { this.props.condition === "NEW" ? this.renderNewProfile() : this.renderEditProfile() }
  </React.Fragment>
  )
  }
}
