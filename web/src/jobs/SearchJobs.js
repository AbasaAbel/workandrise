import React, {Component} from 'react';
import { Row, Col, Button, Glyphicon, PageHeader, FormGroup, FormControl,Thumbnail } from "react-bootstrap";
import './SearchJobs.css';
import thumbnailDiv from '../icon.png';
import { Link } from "react-router-dom"
import JobBlock from './JobBlock';
import LoaderButton from '../components/LoaderButton';

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
            this.setState({
                filteredUsers: searchedUsers
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

      renderFilteredUserList = () => {
        return this.state.filteredUsers.map(val => {
            return (
                <Col xs={12} md={3}>
                    <Thumbnail  src={thumbnailDiv} alt="242x200">
                        <center>
                            <strong>{val.firstName}{' '}{val.lastName}</strong>
                            <p>
                                {val.bio}
                            </p>
                            <p>Hourly Rate : UGX {val.rate}</p>
                            <p>Industry: {val.industry}</p>
                            <p>Residence : {val.city}</p>
                            <p><strong>Skills</strong>
                                <ul>
                                    <li>{val.userPrimarySkill}</li>
                                    <li>{val.userSecondarySkill}</li>
                                    <li>{val.userTertiarySkill}</li>
                                </ul>                            
                            </p>
                            <Button bsStyle="primary" disabled>Select For Contact</Button>
                            
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

    componentDidMount = () =>{
        this.getUsers();
    }

    render(){

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
                                   
            </div>
        );
    }
}
