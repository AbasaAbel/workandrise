import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default class Footer extends Component {
  createNotification = (type, message, messageTitle) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info(message, messageTitle);
          break;
        case 'success':
          NotificationManager.success(message, messageTitle, 3000);
          break;
        case 'warning':
          NotificationManager.warning(message, messageTitle, 3000);
          break;
        case 'error':
          NotificationManager.error(message, messageTitle, 10000, () => {
            console.log('Error')
          });
          break;
        default:
          break;
      }
    };
  };
  render() {
    const footerStyle = {
      textAlign: 'center',
      // position: 'absolute',
      bottom: 0,
      // padding: '20px',
      left: 0,
      right: 0,
      // background: '#ddd',
    }

    return(
      <div style={footerStyle}>
        <NotificationContainer />
        <div id="transaction-failure" onClick={this.createNotification('error','Your transaction was not successful.', 'Transaction Error')} ></div>
        <div id="transaction-success" onClick={this.createNotification('success','Your transaction was successful.', 'Transaction Status')} ></div>
        <div id="database-success" onClick={this.createNotification('success','Your action was successful.', 'Confirmation')} ></div>
        <div id="database-failure" onClick={this.createNotification('error','There was an error while processing your request - please refresh the page, check your internet connection, & try again.', 'Database Error')} ></div>
        <div id="transaction-pending" onClick={this.createNotification('warning','Your transaction is pending.', 'Transaction Status')} ></div>
        <h1><a href="https://workandrise.today/tos.html" target="_blank" rel="noopener noreferrer">Terms of Service</a> - <a href="https://workandrise.today/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></h1>
        <h2>Version 0.91 - Please send any bugs, platform feedback & feature requests to celestine@workandrise.today </h2>
      </div>
    )
  }
}
