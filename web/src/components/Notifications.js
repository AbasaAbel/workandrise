import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, Button, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Notifications extends Component {
  constructor(props){
    super(props);

    this.state = {
      notifications: [],
      list: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const results = await this.getNotifications();
    this.setState({ notifications: results })
  }

  getNotifications() {
    return API.get('wr-messaging', `/notifications/all/${this.props.username}`)
  }

  async markNotificationAsRead(id, info) {
    return API.put('wr-messaging', `/notifications/item/${id}`, {
      body: info
    })
  }

  handleSubmit = async (e, id) => {
    e.preventDefault();

    try {
      await this.markNotificationAsRead(id, {
        username: this.props.username
      });
      this.renewNotifications();
      }
     catch (e) {
      alert(e);
      console.log(e)
    }
  }

  async renewNotifications() {
    const results = await this.getNotifications();
    this.setState({ notifications: results })
  }

  renderNotifications(notifications) {
    return [{}].concat(notifications).map((notification, i) => (

      i !== 0 && notification.Unread === true
      ? ( <ListGroupItem key={notification.NotificationId}>
          <h4>
            {notification.NotificationMessage}<br />
            {(new Date(notification.CreatedAt)).toLocaleString() }

          </h4>
            <Button bsSize="small" onClick={(e) => this.handleSubmit(e, notification.NotificationId)}>
              <Link to={{
                pathname: `${notification.Thread}`,
                state: {
                  subjectId: notification.SenderId,
                  notificationMessage: notification.NotificationMessage,
              }
                }}>
                Respond</Link>
              </Button><Button bsSize="small" onClick={(e) => this.handleSubmit(e, notification.NotificationId)}>
                Delete Notification</Button>
      </ListGroupItem> )

      : ( <React.Fragment key={i}></React.Fragment> )
      )
    )
  }

  render() {

    const unreadNotifications = this.state.notifications;
    const result = unreadNotifications.filter(unreadNotification => unreadNotification.Unread === true)


    if (this.state.notifications.length > 0) {
    return(
        <React.Fragment>
          <PageHeader>Notifications ({result.length})</PageHeader>
          { this.renderNotifications(this.state.notifications)}
        </React.Fragment>
    )} else {
      return (<PageHeader>Notifications</PageHeader>)
    }
  }
}
