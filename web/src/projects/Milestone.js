import React, { Component } from "react";
import { Button, Glyphicon, ListGroup, ListGroupItem, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class Milestone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      open: false,
      title: "",
      description: "",
      rate: ""
    }

    this.editMilestoneState = this.editMilestoneState.bind(this);

  }

  editMilestoneState() {
    this.setState({
      open: true
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.props.updateMilestone(this.state.title, this.state.description, this.state.rate)

    }
    catch(e) {
      console.log(e);
      alert(e);
      this.setState({ isLoading: false })
    }

    this.setState({ isLoading: false, open: false })
  }

  handleComplete = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.props.completeMilestone(this.props.rate)

    }
    catch(e) {
      console.log(e);
      alert(e);
      this.setState({ isLoading: false })
    }
    this.setState({ isLoading: false, open: false })

  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  renderCompleteButton() {
    if (!this.props.complete && this.props.employerId === this.props.username) {
      return(
        <ListGroupItem><Button onClick={this.handleComplete}><Glyphicon glyph="gbp" /> Milestone Finished - Release Money</Button></ListGroupItem>
      );
    } else {
      return;
    }
  }

  renderEditButton() {
    if (this.props.employerId === this.props.username) {
      return(
        <ListGroupItem><Button onClick={this.editMilestoneState}><Glyphicon glyph="pencil" /> Edit Milestone</Button></ListGroupItem>
      );
    } else {
      return;
    }
  }



  renderMilestone() {
    if (!this.state.open) {
      return(
      <React.Fragment>
        <ControlLabel>Milestone #{this.props.id}</ControlLabel>
        <ListGroup>
          <ListGroupItem>{this.props.title}</ListGroupItem>
           {/* //eslint-disabled */}
          <ListGroupItem>{this.props.rate}</ListGroupItem>
          <ListGroupItem>{this.props.description}</ListGroupItem>
          { this.renderEditButton()}
          { this.renderCompleteButton()}
        </ListGroup>

      </React.Fragment>
    )
  } else {
    return(
    <React.Fragment>
      <FormGroup controlId="title" >
        <ControlLabel>Milestone #{this.props.id} - Title</ControlLabel>
        <FormControl
          onChange={this.handleChange}
          value={this.state.title}
          type="text"
          placeholder="Ex: Submit Graphic Design Mockup" />
     </FormGroup>

     <FormGroup controlId="rate" >
       <ControlLabel>Milestone #{this.props.id} - Rate</ControlLabel>
       <FormControl
         onChange={this.handleChange}
         value={this.state.rate}
         type="number"
         placeholder="Ex: 15,000 UGX" />
    </FormGroup>

      <FormGroup controlId="description">
        <ControlLabel>Milestone #{this.props.id} - Description</ControlLabel>
        <FormControl
          onChange={this.handleChange}
          value={this.state.description}
          componentClass="textarea"
          placeholder="Please provide a description of the job, task or project... " />
      </FormGroup>


     <LoaderButton
       block
       bsSize="large"
       // disabled={!this.props.validateForm}
       onClick={this.handleSubmit}
       isLoading={this.state.isLoading}
       text="Save Changes"
       loadingText="Saving…"
     />
    </React.Fragment>
    )
  }
}

  render() {
    return(
    <React.Fragment>
      { this.renderMilestone()}
    </React.Fragment>

    )
  }
}
