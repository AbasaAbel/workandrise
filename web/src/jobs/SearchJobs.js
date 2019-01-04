import React, {Component} from 'react';
import { Row, Col, Button, Image, PageHeader, FormGroup, Collapse, FormControl,Thumbnail } from "react-bootstrap";
import './SearchJobs.css';
import thumbnailDiv from '../icon.png';
import { Link } from "react-router-dom"
import JobBlock from './JobBlock';

export default class Search extends Component{
    constructor(props) {
        super(props);
    
        // job list is gotten from the props
        this.state = {
            searchCategory: "jobs",
            query: "",
            userList : [], // the list for all the users
            filteredUsers : [], // the list of users that have been filtered
            filteredJobs: [], // the list of jobs that have been filtered
            selected_contacts : [], // employees that one wants to purchase contacts for
            accordion: [] // state for the collapsible used
        };
      }

      handleChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        })
      }

      handleSearch = (e) =>{
          if(e.target.length <= 0){}
          else if(this.state.searchCategory === "skills"){ // searching for skills
            const searchedUsers = this.state.userList.filter(user => {
                const normalizedSearch = e.target.value.replace(/[^A-Za-z0-9]+/gi, '')
                const regex = new RegExp(normalizedSearch, 'i');
                try{
                    return user.userPrimarySkill.match(regex) || user.userSecondarySkill.match(regex) || user.userTertiarySkill.match(regex) || false
                }
                catch(exception){return false}
            });
            // set the accordion state here
            var accordion_state = []

            //for loop to populate accordion state
            for (var i=0; i < searchedUsers.length; i++) {
                accordion_state.push(false);
            }

            this.setState({
                filteredUsers: searchedUsers,
                accordion : accordion_state
            })
          }
          else { // search for jobs
            const searchedJobs = this.props.jobs.filter(job => {
                const normalizedSearch = e.target.value.replace(/[^A-Za-z0-9]+/gi, '')
                const regex = new RegExp(normalizedSearch, 'i');
                try{
                    return job.title.match(regex) || job.industry.match(regex) || false
                }
                catch(exception){return false}
                });
                this.setState({
                    filteredJobs: searchedJobs
            })

          }
      }


      toggleAccordion(tab) {
            const prevState = this.state.accordion;
            const state = prevState.map((x, index) => tab === index ? !x : false);
            this.setState({
                accordion: state,
            });
    }

      getUsers = () => {
        fetch(`https://server.workandrise.today/api/user`, {
            method: 'GET',
            headers: {
                'x-access-token': this.props.accessToken
            }
        }).then((data) => {
            data.json().then((usersList) => { 
                this.setState({
                    userList: usersList,
                    fetching: false
                })
            }
            )
        })
      }

    //   renderPhoto = (user_id) => {
    //       try{
    //         const link = `https://s3.eu-central-1.amazonaws.com/wr-uploads/${user_id}`;
    //         return (
    //           <Image src={link} rounded height="180" width="160" />
    //         );
    //       }
    //       catch(e){
    //         return (
    //             <Image src={thumbnailDiv} rounded height="180" width="160" />
    //           );
    //       }
        
    //   }


    /*
    determines if a user is already selected
    this helps identify the right button to 
    display to the users
    */
    isUserSelected = (user_id) => {
        const x = this.state.selected_contacts.filter(user => {
            try{
                return user.GraduateId.match(user_id) || false
            }
            catch(exception){return false}
        });
        try{
            if (x.length === 1){
                return true
            }
            else{
                return false
            }
        }
        catch(exception){return false}   
    }


        renderFilteredUserList = () => {
        return this.state.filteredUsers.map((val, index) => {
            return (
                <Col xs={12} md={3}>
                    <Thumbnail >
                     <center>
                            <Row>
                                <div>
                                <Image src={thumbnailDiv} height="170" width="170" alt="User has no profile picture"/>
                            
                                </div>
                            </Row>
                            <strong>{val.firstName}{' '}{val.lastName}</strong>
                            <center>Hourly Rate : UGX {val.rate}</center><br />
                            <Row>    
                                <div>
                                    <Button onClick={() => {this.toggleAccordion(index) }}>                                    
                                        View Details
                                    </Button>
                                    <Collapse in={this.state.accordion[index]}>
                                    <div>
                                        <p>{val.bio}</p>
                                        <p>Industry: {val.industry}</p>
                                        <p>Residence : {val.city}</p>
                                        <p><center><strong>Skills</strong></center>
                                            <ul>
                                                <li>{val.userPrimarySkill}</li>
                                                <li>{val.userSecondarySkill}</li>
                                                <li>{val.userTertiarySkill}</li>
                                            </ul>                            
                                        </p>
                                    </div>
                                    </Collapse>
                                </div>
                            </Row>
                            <br />
                            <Row>
                                <div>
                                    { this.isUserSelected(val.id) ?
                                        <Button 
                                            bsStyle="danger" 
                                            onClick = { () => {this.handleContactSelection(val, "user")}}
                                        >
                                        Cancel Selection
                                        </Button>
                                        :                                        
                                <Button 
                                            bsStyle="primary" 
                                            onClick = { () => {this.handleContactSelection(val, "user")}}
                                        >
                                        Select For Contact
                                        </Button>
                                    }
                                    
                                </div>
                            </Row>
                            
                        </center>
                    </Thumbnail>
                </Col>
            )
        })
        }
    

        renderFilteredJobs = () => {
            return (
                <Row>
                    <Col xs={12} md={6} lg={6}>
                    <ul>
                        {this.state.filteredJobs.map((job, index) => (
                        job.complete === false && index % 2 === 0
                            ? (<li key={index}>
                            <JobBlock
                                {...this.state.filteredJobs[index]}
                                applyForJob={this.applyForJob}
                                getJob={this.getJob}
                            /></li>)
                            : (<React.Fragment key={index}></React.Fragment>))
                        )
                        }
                    </ul>
                    </Col>
                    
                    <Col xs={12} md={6} lg={6}>
                    <ul>
                        {this.state.filteredJobs.map((job, index) => (
                        job.complete === false && index % 2 === 1
                            ? (<li key={index}>
                            <JobBlock
                                {...this.state.filteredJobs[index]}

                                applyForJob={this.applyForJob}
                                getJob={this.getJob}
                            /></li>)
                            : (<React.Fragment key={index}></React.Fragment>))
                        )
                        }
                    </ul>
                    </Col>

                </Row>
            )
        }


        renderSearchForm = () => {
            return(
                <div>
                      <form className="md-form mr-auto m-0">
                      <Col xs={12} sm={6} md={6}>
                            <FormGroup controlId = "searchCategory">
                                <FormControl componentClass="select"
                                onChange={this.handleChange}
                                >
                                <option value="jobs">Select search category</option>
                                <option  value="jobs" >Jobs</option>
                                <option  value="skills" >Skilled Personnel</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>

                            <FormGroup controlId="query">
                            <FormControl
                                autoFocus
                                type="text"
                                // value={this.state.query}
                                onChange={this.handleSearch} Style={"border-radius:40px;"}
                                placeholder="Enter job title or skills"
                            />
                            </FormGroup>

                        </Col> 
                        
                        {/* <Col xs={12} sm={2} md={2}>
                             <Button
                                    outline
                                    color="white"
                                    size="sm"
                                    className="mr-auto"
                                    onClick={this.searchByQuery}
                                    >
                                    Search
                            </Button>
                        </Col>           */}

                        </form>
                </div>
            )
        }

        /*
        constructs an object that can be posted 
        to the purchase contact sls
        */
        constructPurchaseContact = (user_object, profile_type) => {
           
            if (profile_type === "user"){ // when a user profile is submitted
                const object = {
                    "EmployerId" : this.props.profile.id,
                    "GraduateId" : user_object.id,
                    "FirstName" : user_object.firstName,
                    "LastName" : user_object.lastName,
                    "University" : "N/A",
                    "PricePaid" : 0,
                    "Email" : user_object.email,
                    "Phone" : user_object.phone,
                }    
                return object;     
            }
            else { // when a graduate profile is submitted
                const object = {
                    "EmployerId" : this.props.profile.id,
                    "GraduateId" : user_object.GraduateId,
                    "FirstName" : user_object.FirstName,
                    "LastName" : user_object.LastName,
                    "University" : user_object.University,
                    "PricePaid" : 0,
                    "Email" : user_object.Email,
                    "Phone" : user_object.Phone,
                }
                return object;
            } 
            
        }

        /*
        Function adds an object of the employee/graduate to the 
        array of contacts that a user wants to the purchase.
        */
        handleContactSelection = (user_object, profile_type) => {
            const selected_contacts = this.state.selected_contacts
            // remove employee if the employee has been selected before
            if (profile_type === "user"){    
                const attempt_remove = selected_contacts.filter(function(sc){
                        return sc.GraduateId !== user_object.id;
                    })

                if (attempt_remove.length < selected_contacts.length){
                    selected_contacts = attempt_remove;
                }
                else{
                    selected_contacts.push(this.constructPurchaseContact(user_object, profile_type));
                }
            }

            
            this.setState({selected_contacts : selected_contacts});
        }

    componentDidMount = () => {
        this.getUsers();
    }

    render(){
        const sel = {
            position: 'fixed',
            bottom: 10,
            right: 10
        }
        return(
            <div style={{paddingTop:'10px'}}>
                {this.renderSearchForm()}
                <div>
                
                    <PageHeader>
                    <center>Search Results for {
                        this.state.searchCategory === "jobs"
                        ?
                        "JOBS"
                        :
                        "WORKERS WITH SKILLS"
                        }
                        </center>
			        </PageHeader>
                    {
                        this.state.searchCategory === "skills"
                        ?
                        this.renderFilteredUserList()
                        :
                        this.renderFilteredJobs()
                    }  
                </div> 
                
                <div style={sel}>
                    <Link to = {{
                        pathname: '/selected-contacts',
                        state: {
                            contacts : this.state.selected_contacts
                        }
                    }}>
                        <SelectButton selected_contacts={this.state.selected_contacts} />
                    </Link>
                </div>
                
                                   
            </div>
        );
    }
}

class SelectButton extends Component{
    render(){
        return(
            <Button className="btn btn-success">
                Selected Contacts ({this.props.selected_contacts.length})
            </Button>
        );
    }
}
