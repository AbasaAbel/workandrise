import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, InputGroup, PageHeader } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";

export default class AddReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: {},
      rating: '',
      review: ''
    };
  }

  // What information do I need here?
  // I am the reviewer, and my username is available.
  // I need to determine the other user in the transaction, and make their
  // id the subjectId for the notification, and their first and last name, and job name
  // Content: You need to write a review for {subject.name}



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  createReview(review) {
    return API.post('wr-messaging', '/add-review', {
      body: review
    })
  }

  validateForm() {
    return this.state.review.length > 0 && parseInt(10, this.state.rating) <= 5;
  }

  handleSubmit = async event => {
    event.preventDefault();
    // this.setState({
    //   isLoading: true,
    //   showModal: false,
    //  });
    const propsInfo = this.props.location.state;


    try {
      await this.createReview({
        subjectId: propsInfo.subjectId,
        reviewerId: this.props.username,
        rating: this.state.rating,
        content: this.state.review
      });
    }
    catch (e) {
      console.log(e.statusCode)
      alert(e);
      this.setState({ isLoading: false });
    }
    this.props.history.push('/profile')
  }

  render() {

    return (
      <React.Fragment>
        <PageHeader>Leave a Review</PageHeader>
        {this.props.location.state.subjectId}
        {this.props.location.state.notificationMessage}
        <FormGroup controlId="rating">
          <ControlLabel>Rating</ControlLabel>
            <InputGroup>
              <FormControl
                type="number"
                onChange={this.handleChange}
                value={this.state.rating}
                placeholder="Add your Rating"
                />
              <InputGroup.Addon>/5</InputGroup.Addon>
            </InputGroup>

        </FormGroup>
        <FormGroup controlId="review">
          <ControlLabel>Write Review</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.review}
            type="textarea"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          onClick={this.handleSubmit}
          isLoading={this.state.isLoading}
          text="Add Review"
          loadingText="Creating…"
        />
      </React.Fragment>
    )
  };

};
