import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, PageHeader } from "react-bootstrap";
import MessageThread from "./MessageThread";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config.js";
import { API } from "aws-amplify";
import "./Messages.css";

export default class Messages extends Component {

  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      userId: this.props.username,
      messages: [],
      message: "",
      value: "",
      isLoading: false,
      recipient: {}
    }

    this.createMessage = this.createMessage.bind(this);
  }

  async componentDidMount() {
    const path = window.location.pathname.split('/');
    const pathThread = path[2];
    const idArray = pathThread.split('_')

    let receiverId;
    if (this.props.username === idArray[0]) {
      receiverId = idArray[1];
    } else {
      receiverId = idArray[0];
    }

    try {
      this.getRecipientProfile(receiverId)
      const results = await this.getThreadHistory();
      this.setState({ messages: results })
      // console.log(this.state.messages)
    } catch(e) {
      console.log(e);
      // alert(e);
    }
  }

  validateForm() {
    return this.state.message.length > 0;
  }

  getRecipientProfile = (id) => {
    return fetch(`${process.env.REACT_APP_PROD_SERVER}/user/${id}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((responseText) => {
      var response = responseText.json();
      response.then((response) => {
        this.setState({
          recipient: response
        });
      });
    })
  }

  getThreadHistory(threadId) {
    const path = window.location.pathname.split('/');
    const id = path[2];
    return API.get('wr-messaging', `/messages/${id}`)
  }

  async renewThread() {
    try {
      const results = await this.getThreadHistory();
      this.setState({ messages: results })
      this.file = null;
    } catch(e) {
      console.log(e);
      alert(e);
    }
  }

  createMessage(message) {
    return API.post('wr-messaging', '/messages', {
      body: message
    })
  }

  createNotification(message) {
    return API.post('wr-messaging', '/notifications', {
      body: message
    })
  }

  sendSMS(message) {
    return API.post('wr-messaging', '/message-received', {
      body: message
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
  }


  handleSubmit =  async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert('Please pick a file smaller than 25MB');
    return;
  }

    const path = window.location.pathname.split('/');
    const pathThread = path[2];
    const idArray = pathThread.split('_')

    let receiverId;
    if (this.props.username === idArray[0]) {
      receiverId = idArray[1];
    } else {
      receiverId = idArray[0];
    }

    const notificationMessage = `Message - ${this.props.profile.firstName} ${this.props.profile.lastName}`

    this.setState({ isLoading: true })


    try {
      const uploadedFilename = (this.file)
        ? (await s3Upload(this.file, this.props.userToken, 'wr-messages')).Location
        : null;


      await this.createMessage({
        threadId: pathThread,
        attachment: uploadedFilename,
        content: this.state.message,
        recipientId: receiverId,
        senderId: this.props.username,
        notificationMessage: notificationMessage,
        message: `You have received a new message on Work & Rise from ${this.props.profile.firstName} ${this.props.profile.lastName}. Log in at https://platform.workandrise.today to see the details.`,
        phone: this.state.recipient.phone
      });

      await this.createNotification({
        recipientId: receiverId,
        senderId: this.props.username,
        notificationMessage: notificationMessage,
        threadId: window.location.pathname
      })

      await this.sendSMS({
        message: `You have received a new message on Work & Rise from ${this.props.profile.firstName} ${this.props.profile.lastName}. Log in at https://platform.workandrise.today to see the details.`,
        phone: this.state.recipient.phone
      })


      this.setState({ isLoading: false, message: '' })
      this.file = null;
      this.renewThread();
    } catch(e) {
      console.log(e);
      this.setState({ isLoading: false})
      alert(e);
    }
  }


  render() {

    return(
      <React.Fragment>
        <PageHeader>Message Thread</PageHeader>
        <MessageThread
          messages={this.state.messages}
          username={this.props.username}
        />
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl
            onChange={this.handleFileChange}
            type="file" />
        </FormGroup>
        <FormGroup controlId="message">
          <ControlLabel>Add Message</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.message}
            type="text"
            placeholder="Enter message"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          onClick={this.handleSubmit}
          isLoading={this.state.isLoading}
          text="Add Message"
          loadingText="Creating…"
        />
      </React.Fragment>
    );
  }
}
