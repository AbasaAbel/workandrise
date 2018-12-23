import React, { Component } from 'react';
import Message from './Message';
import './Messages.css';

export default class MessageThread extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.props.messages.map((message, i) => (
      <Message
        key={i}
          // username={message.SenderId}
        username="Respondent"
        message={message.Content}
        fromMe={message.SenderId === this.props.username}
        attachment={message.Attachment}
      />
    ));

    return (
      <div className="messages" id="messageList">
        {messages}
      </div>
    );
  }
}
