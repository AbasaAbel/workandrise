import React, { Component } from "react";
import {Table, Button, PageHeader} from 'react-bootstrap';

export default class SelectedContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts : []
    }
  }
    
    /*
    deletes a contact from the list,
    graduateId is actually the employeeId
    */
    deleteFromContacts = (graduateId) => {
        const cleaned_list = this.state.contacts.filter(function(contact){
            return contact.GraduateId !== graduateId;
        });
        this.setState({contacts: cleaned_list});
    }

    renderContactListing = () => { 
        return this.state.contacts.map( (contact, index) => {
            return(
                <tr id={index}>
                    <td>{contact.FirstName} {' '} {contact.LastName}</td>
                    <td>{contact.University}</td>
                    <td>{contact.PricePaid}</td>
                    <td>
                        <Button 
                            bsStyle = "danger"
                            onClick = { () => { this.deleteFromContacts(contact.GraduateId) }}
                        >Delete
                        </Button>
                    </td>
                </tr>
            );
        });
    }

    componentDidMount = () => {
        //check if the contacts are provided
        try{
            this.setState({contacts : this.props.location.state.contacts});
        }
        catch(e){
            this.props.history.replace("/search")
        }
    }

    render() {      
        return(
        <React.Fragment>
            <PageHeader> Review your selected contacts</PageHeader>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>University</th>
                        <th>Fee Payable</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderContactListing()}
                </tbody>
            </Table>
        </React.Fragment>
        );
    }
}
