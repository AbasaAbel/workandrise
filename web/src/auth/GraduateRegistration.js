import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";


export default class GraduateRegistration extends Component {
    constructor(props) {
      super(props);  
      this.state = {
        isLoading : false,
        university: "OTHER",
        degree: "",
        startYear: "",
        endYear: "",
        cgpa: "",
        courses: [],//currently left blank
        salary: "",
        letters: [], //currently left blank 
      }
    }

    // We are passing in firstName, lastName, email and phone from props.
    // this.props.profile.firstName
    // Might want to make a new route in Route.js and make sure to pass childProps in

    handleChange = event => {
      this.setState({
        [event.target.id] : event.target.value,
        isLoading : false
      });
    }

    //function to finally submit the education details to the backend application
    // needs to be async function
    registerGraduate = async event => {
      event.preventDefault();
      this.setState({isLoading : true}); 
      
      try{
        let serverlessResponse  = await this.submitProfile({
            // all the attributes that we need to successfully send the lambda function
            graduateId: this.props.profile.id,
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            email: this.props.profile.email,
            phone: this.props.profile.phone,  
            // Everything above is from props, below is unique forms.
            university: this.state.university,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            degree: this.state.degree,
            cgpa: this.state.cgpa,
            courses: this.state.courses,
            salary: this.state.salary, 
            letters: this.state.letters
          })
          // console.log(serverlessResponse)
          this.props.history.push('/'); //we may identify a better point to take the user after 
        }
      catch(e){
        alert(e);
        this.setState({isLoading : false});
      }
    }

    submitProfile(message) {
      return API.post('wr-messagin', '/create-profile', {
        body: message
      })
    }

    populateFormUniversities = () => {
      let universityList = this.props.universities.map((university, index) => {
        return <option key={index} value={university.abbreviation}>{university.name}</option>
      });
      return universityList;
    }

    populateFormCourse = () => {
      let courseList = this.props.courses.map((course, index) => {
        return <option key = {index} value = {course.code}>{course.name}</option>
      });
      return courseList;
    }

    renderGraduateRegistrationForm() {
      let universityList = this.populateFormUniversities();
      let courseList = this.populateFormCourse();
      
      return(
        <Row >
        <div className="card">
          <div className="card-body" >
          <center><h4>Register for Graduate Portal</h4></center>
            <form>

              {/* Add the other form controls that we need based off the DynamoDB data model */}


              <FormGroup controlId="university">
                <ControlLabel>University</ControlLabel>
                <FormControl 
                  componentClass = "select"
                  onChange={this.handleChange}
                  value={this.state.university}
                  Style={"border-radius:40px;"}
                  >
                  <option value = 'OTHER'>Select the university you went to</option>
                  {universityList}
              </FormControl>
            </FormGroup>

              <FormGroup controlId="degree">
                <ControlLabel>Award/Degree Received</ControlLabel>
                <FormControl 
                  componentClass = "select"
                  onChange={this.handleChange}
                  value={this.state.degree}
                  Style={"border-radius:40px;"}
                  >
                  <option value = 'OTHER'>Select the award/degree you attained</option>
                  {courseList}
                </FormControl>  
              </FormGroup>

              <FormGroup controlId="startYear">
                <ControlLabel>Year Joined</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.startYear}
                  onChange={this.handleChange} 
                  Style={"border-radius:40px;"}
                  placeholder="The year you joined the university"
                  // number only, no text
                />
              </FormGroup>

              <FormGroup controlId="endYear">
                <ControlLabel>Year Left</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.endYear}
                  onChange={this.handleChange} 
                  Style={"border-radius:40px;"}
                  placeholder="The year you left the university"
                  // same as above
                />
              </FormGroup>

              <FormGroup controlId="cgpa">
                <ControlLabel>Your CGPA</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.cgpa}
                  onChange={this.handleChange} 
                  Style={"border-radius:40px;"}
                  placeholder="Your final CGPA"
                />
              </FormGroup>

              <FormGroup controlId="salary">
                <ControlLabel>Your desired salary in UGX</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.salary}
                  onChange={this.handleChange} 
                  Style={"border-radius:40px;"}
                  placeholder="Your desired monthly salary e.g. 450000"
                />
              </FormGroup>


              {/* identify if to disable the loading button or not */}
              {this.state.university.length > 0 &&
                this.state.degree.length > 0 &&
                this.state.startYear.length > 0 &&
                this.state.endYear.length > 0 &&
                this.state.cgpa.length > 0 &&
                this.state.salary.length > 0
                ?
                <LoaderButton
                        block
                        bsSize="large"
                        onClick={this.registerGraduate}
                        isLoading={this.state.isLoading}
                        text="Save Profile"
                        loadingText="Please Wait..."
                      />
                :null
                }

               
              
            </form>
          </div>
        </div>
        <Col sm={3} md={3}></Col>
        </Row>
      )
    }

    render() {
      return(this.renderGraduateRegistrationForm())
    }

}


