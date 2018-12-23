import React, { Component } from "react";
import { PageHeader, Row, Col, Well } from "react-bootstrap";
import SelectComponent from '../components/SelectComponent'


export default class Sandbox2 extends Component {
    constructor(props) {
        super(props);

        this.pendingRequests = 0;

        this.state = {
            showModal: false,
            transaction: [],
            metadata: [],
            phone: [],
            isLoading: null,
            selectedIndustries: [],
            filteredJobs : [],
            postings : [
                {
                    industry: 'Engineering',
                    posting: 'I need help'
                },
                {
                    industry: 'Professional',
                    posting: 'I need help'
                },
                {
                    industry: 'Creative-arts',
                    posting: 'I need help'
                },
                {
                    industry: 'Software-Development',
                    posting: 'I need help'
                }
            ]
        }
    }

    filterJobs = () => {
        
        return this.state.postings.filter(val => {
            return this.state.selectedIndustries.includes(val.industry)
            }).map(val => {
                return (
                    <Col md={6} mdPull={6}>
                        <Well>
                            <p>
                                industry: {val.industry}
                            </p>
                            post: {val.posting}
                        </Well>
                    </Col>
                )
            })
    }

    handleIndustry = (e) => {
        const onlyNames = e.reduce((acc, next) => {
            acc.push(next['value'])
            return acc
        }, [])
        this.setState({ selectedIndustries: onlyNames }, ()=> this.filterJobs() )
        
    }

    componentDidMount = () => {
        console.log(this.props)
    }

    render() {

        const jobs = this.state.postings.map(val => {
            return (
                <Col md={6} mdPull={6}>
                    <Well>
                        <p>
                            industry: {val.industry}
                        </p>
                        post: {val.posting}
                    </Well>
                </Col>
            )
        })

        return (
            <React.Fragment>
                <PageHeader>Sandbox 2</PageHeader>

                <SelectComponent
                    defaultValue='All'
                    name="Industries"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    data={this.props.industries}
                    handleIndustry={this.handleIndustry}
                    placeHolder='Filter Industries'
                />
                <Row className="show-grid">
                    { this.state.selectedIndustries.length === 0
                    ? jobs
                    : this.filterJobs() 
                    } 

                </Row>
            </React.Fragment>
                )
            }
        }
