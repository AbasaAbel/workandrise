import React, { Component } from "react";
import { PageHeader, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";

export default class UploadPicture extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
    }
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert('Please pick a file smaller than 5MB');
    return;
  }

    this.setState({ isLoading: true });

    try {
      await s3Upload(this.file, this.props.userToken, 'wr-uploads', this.props.username)
      this.setState({ isLoading: false })
      this.props.history.push('/profile')
      document.getElementById('database-success').click();


    }
    catch(e) {
      document.getElementById('database-failure').click();
      console.log(e);
    }
  }

  render() {
    return(
      <React.Fragment>
        <PageHeader>Upload Profile Photo</PageHeader>
          <FormGroup controlId="file" >
            <ControlLabel>Picture</ControlLabel>
            <FormControl
              onChange={this.handleFileChange}
              type="file" />
          </FormGroup>

          <LoaderButton
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            onClick={this.handleSubmit}
            isLoading={this.state.isLoading}
            text="Upload Photo"
            loadingText="Editing..."
          />
      </React.Fragment>
    )
  }
}
