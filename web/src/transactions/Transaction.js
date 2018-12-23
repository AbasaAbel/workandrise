import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import ConfirmModal from "../auth/ConfirmModal";
import MessageButton from "../messaging/MessageButton";
import ProjectButton from "../projects/ProjectButton";
import { CSVLink } from 'react-csv';

export default class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      transaction: [],
      freelancerInfo: [],
      employerInfo: [],
      jobInfo: [],
      appInfo: [],
      success: [],
    }

    this.renderContractCompletionProject = this.renderContractCompletionProject.bind(this);
    this.completeTransaction = this.completeTransaction.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    try {
      this.getTransaction();
    }
    catch(e) {
      alert(e);
    }
  }



  openModal = () => {
      this.setState({ showModal: true });
    }

  closeModal = () => {
    this.setState({ showModal: false });
    }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  getTransaction() {
    fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })
    .then((responseText) => responseText.json())
    .then((response) => {
      console.log(response)
      this.setState({
        transaction: response,
        freelancerInfo: response.freelancerInfo,
        employerInfo: response.employerInfo,
        jobInfo: response.jobInfo,
        appInfo: response.appInfo
      });
    })
  }

  payFreelancer(payment) {
    return API.post('wr-messaging', '/beyonic/pay-freelancer', {
      body: payment
    })
  }

  createReviewNotification(info) {
    return API.post('wr-messaging', '/notifications', {
      body: info
    })
  }

  completeProjectTransaction = (event) => {
    event.preventDefault();

    const message = `${this.state.jobInfo.title} has concluded - please leave review.`

    const promise1 = fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}/complete`, {
      method: 'PUT',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })

    const promise2 = this.createReviewNotification({
      notificationMessage: message,
      recipientId: this.state.freelancerInfo.id,
      senderId: this.props.username,
      threadId: '/review'
    })

    const promise3 = this.createReviewNotification({
      notificationMessage: message,
      recipientId: this.props.username,
      senderId: this.state.freelancerInfo.id,
      threadId: '/review'
    })

    promise1.then(() => promise2).then(() => promise3)

    }

    // retryTransaction = (event) => {
    //   event.preventDefault();

    //   const message = `Your W&R freelance opportunity ${this.state.jobInfo.title} has concluded - please leave a review of your experience.`

    //   const promise1 = this.payFreelancer({
    //     firstName: this.state.freelancerInfo.firstName,
    //     lastName: this.state.freelancerInfo.lastName,
    //     phoneNumber: this.state.freelancerInfo.phone,
    //     // phonenumber: +80034565780,
    //     currency: `${process.env.REACT_APP_PROD_CURRENCY}`,
    //     amount: this.state.transaction.rate * 0.95,
    //     // metadata: metadata
    //   }).then((responseText) => {
    //     document.getElementById('transaction-pending').click()
    //     return responseText;
    //   })
    //   .then((responseText) => {
    //     var response = responseText.json();
    //       response.then((response) => {
    //         console.log(response);
    //         this.setState({
    //           transaction: response,
    //           showModal: false
    //         });
    //       });
    //   return response;
    // }).then((data) => {
    //   if (data.id > 0) {
    //     document.getElementById('transaction-success').click()
    //     return data;
    //   } else {
    //     document.getElementById('transaction-failure').click()
    //     return data;
    //     }
    //   }).catch((error) => {
    //     console.log('Beyonic Fetch Error: ', error)
    //     // document.getElementById('transaction-failure').click();
    //   })

    //   const promise3 = this.createReviewNotification({
    //     notificationMessage: message,
    //     recipientId: this.state.freelancerInfo.id,
    //     senderId: this.props.username,
    //     threadId: '/review'
    //   })
      
    //   const promise4 = this.createReviewNotification({
    //     notificationMessage: message,
    //     recipientId: this.props.username,
    //     senderId: this.state.employerInfo.id,
    //     threadId: '/review'
    //   })

    //   try {
    //   promise1().then(() => promise3).then(() => promise4)
    // }
    // catch(e) {
    //   console.log(e)
    // }
    // this.props.history.push('/transactions')

    // }


  completeTransaction = (event) => {
    event.preventDefault();

    const message = `Your W&R freelance opportunity ${this.state.jobInfo.title} has concluded - please leave a review of your experience.`

    const promise1 = fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}/complete`, {
      method: 'PUT',
      headers: {
        'x-access-token': this.props.accessToken
      }
    })

    const promise2 = this.payFreelancer({
      firstName: this.state.freelancerInfo.firstName,
      lastName: this.state.freelancerInfo.lastName,
      phoneNumber: this.state.freelancerInfo.phone,
      // phonenumber: +80034565780,
      currency: `${process.env.REACT_APP_PROD_CURRENCY}`,
      amount: this.state.transaction.rate * 0.95,
      // metadata: metadata
    }).then((responseText) => {
      document.getElementById('transaction-pending').click()
      return responseText;
    })
    .then((responseText) => {
      var response = responseText.json();
        response.then((response) => {
          console.log(response);
          this.setState({
            transaction: response,
            showModal: false
          });
        });
    return response;
  }).then((data) => {
    if (data.id > 0) {
      document.getElementById('transaction-success').click()
      return data;
    } else {
      document.getElementById('transaction-failure').click()
      return data;
      }
    }).catch((error) => {
      console.log('Beyonic Fetch Error: ', error)
      // document.getElementById('transaction-failure').click();
    })

    const promise3 = this.createReviewNotification({
      notificationMessage: message,
      recipientId: this.state.freelancerInfo.id,
      senderId: this.props.username,
      threadId: '/review'
    })
    
    const promise4 = this.createReviewNotification({
      notificationMessage: message,
      recipientId: this.props.username,
      senderId: this.state.employerInfo.id,
      threadId: '/review'
    })

    try {
    promise1.then(() => promise2).then(() => promise3).then(() => promise4)
  }
  catch(e) {
    console.log(e)
  }
  this.props.history.push('/transactions')

  }

  renderProjectButton() {
    if (this.state.transaction.type === 'Project') {
      return(
        <React.Fragment>
        <ProjectButton transactionId={this.state.transaction.id} />
      </React.Fragment>
      )
    } else {
      return;
    }
  }

  renderContractCompletionProject() {
    const btn ={backgroundColor: '#fdd835', color: 'black'};

    if (this.state.transaction.type === 'Project') {
      return(
        <React.Fragment>
          <LoaderButton
            block
            style={btn}
            bsSize="large"
            // disabled
            onClick={this.completeProjectTransaction}
            isLoading={this.state.isLoading}
            text="Approve Project Completion"
            loadingText="Submitting..."
          />

        </React.Fragment>

      )
    } else {
      return(
        <React.Fragment>
          <ListGroupItem>By clicking the button below, you certify the work agreed upon has been completed & you authorize Work&Rise to release the payment held in escrow to the freelancer for the daily project.</ListGroupItem>

          <LoaderButton
            block
            style={btn}
            bsSize="large"
            // disabled
            onClick={this.openModal}
            isLoading={this.state.isLoading}
            text="Approve Contract Completion"
            loadingText="Submitting..."
          />

        </React.Fragment>

      )
    }
  }

  renderContractCompletion() {
    if (this.props.username === this.state.transaction.employerId && this.state.transaction.completed === false) {
      return(
        <React.Fragment>
          { this.renderContractCompletionProject() }

        </React.Fragment>
      )
    } else {
      return;
    }
  }



  renderCSV() {
    const btn ={backgroundColor: '#fdd835', color: 'black'};
    const headers = [
      {label: 'Job', key: 'title'},
      {label: 'Freelancer', key: 'freelancerName'},
      {label: 'Amount Paid', key: 'rate'},
      {label: 'Transaction Date', key: 'transactionDate'},
      {label: 'Job Complete', key: 'completed'}
    ]

    const csvData = [
      {
        title: `${this.state.jobInfo.title}`,
        freelancerName: `${this.state.freelancerInfo.firstName} ${this.state.freelancerInfo.lastName}`,
        rate: `${this.state.jobInfo.rate}`,
        transactionDate: `${this.state.transaction.createdAt}`,
        completed: `${this.state.transaction.completed}`
    }
    ]

    return(
      <CSVLink data={csvData} headers={headers} filename={`${this.state.jobInfo.title}-${this.state.freelancerInfo.firstName}-${this.state.freelancerInfo.lastName}.csv`}>
        <LoaderButton
          block
          style={btn}
          bsSize="large"
          text="Download Receipt"

        />
      </CSVLink>
    )

  }

  render() {
    const thread = this.state.jobInfo.userId + '_' + this.state.appInfo.userId;

    return(
      <React.Fragment>
        <PageHeader>{this.state.jobInfo.title}</PageHeader>
        <Row>
          <Col style={{paddingRight: '2.5px'}} xs={6} md={6} lg={6}>
            <MessageButton
              threadId={thread}
              userToken={this.props.userToken}
            />
          </Col>
          <Col style={{paddingLeft: '2.5px'}} xs={6} md={6} lg={6}>
              { this.renderCSV()}
          </Col>
        </Row>
        <br />
        <ListGroup>
          <ListGroupItem>Freelancer - {this.state.freelancerInfo.firstName} {this.state.freelancerInfo.lastName}</ListGroupItem>
          <ListGroupItem>Project Sum: {this.state.jobInfo.rate}</ListGroupItem>
        </ListGroup>


        <br />
        { this.renderProjectButton() }
        <br />
        {this.renderContractCompletion()}


        <ConfirmModal
          openModal={this.openModal}
          paperwork="Transaction"
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          modalTitle="Confirm Contract Completion"
          modalMessage="Clicking the 'Confirm' button below will mark the contract between you & the freelancer as complete, and will send release payment to the freelancer from the earlier deposit of Escrow to Work&Rise."
          modalMessage2="Are you ready to proceed?"
          modalFunction={this.completeTransaction}
          parent="Application"
        />
    </React.Fragment>
    );
  }

}
