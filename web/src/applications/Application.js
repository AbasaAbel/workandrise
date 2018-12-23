import React, { Component } from "react";
import { ListGroup, ListGroupItem, PageHeader, Row, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import MessageButton from "../messaging/MessageButton";
import ViewProfileButton from "../profile/ViewProfileButton";
import ConfirmModal from "../auth/ConfirmModal";
import { API } from "aws-amplify";
import uuidv4 from "uuid";


export default class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      application : [],
      transaction: {},
      profile: [],
      job: [],
      transactionId: null,
      userAttributes: [],
      hourlyRate: "",
      hoursOutstanding: "",
      escrowTotal: "",
      paymentAmount: "",


    }
    this.getJobApp = this.getJobApp.bind(this);
    this.calculatePayment = this.calculatePayment.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

 async componentDidMount() {
   try {
      this.getJobApp();
      const transactionId = uuidv4();
      this.setState({ transactionId: transactionId });
    }
    catch(e) {
      alert(e);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value,
    });
  }

  openModal = () => {
      this.setState({ showModal: true });
    }

  closeModal = () => {
    this.setState({ showModal: false });
    }


  getJobApp = () => {
      return fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
        method: 'GET',
        headers: {
          'x-access-token': this.props.accessToken
        }
      })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            application: response,
            profile: response.userInfo,
            job: response.jobInfo
          })
        })
      })
    }



      chargeEmployer(payment) {
        return API.post('wr-messaging', '/beyonic/charge-employer', {
          body: payment
        })
      }

      sendFreelancerConfirmation(message) {
        return API.post('wr-messaging', '/message-received', {
          body: message
        })
      }


  createTransaction = () => {
    const promise1 = fetch(`${process.env.REACT_APP_PROD_SERVER}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.transactionId,
        type: this.state.job.type,
        rate: this.state.job.rate,
        duration: this.state.job.duration,
        hourlyRate: this.state.hourlyRate,
        // hourly rate can be used to store the hourly rate after WR's cut
        hoursOutstanding: this.state.hoursOutstanding,
        escrowTotal: this.state.escrowTotal,
        escrowLeft: this.state.job.rate,
        numberOfTasksRequested: this.state.numberOfTasksRequested,
        employerId: this.state.job.userId,
        freelancerId: this.state.application.userId,
        jobId: this.state.application.jobId,
        appId: this.state.application.id,
        employerPhone: this.props.profile.phone,
        freelancerPhone: this.state.profile.phone,
        freelancerFirstName: this.state.profile.firstName,
        freelancerLastName: this.state.profile.lastName,
        completed: false
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken
      },
    })

    // Need to calculate amount based on project type here, before promise

    // Collection request to have the employer send money to our wallet
    const metadata = {
      'recipient': `${this.state.application.userId}`,
      'sender': `${this.props.username}`,
      'job': `${this.state.job.title}`,
      'transaction': `${this.state.transactionId}`,
      'phone': `${this.state.profile.phone}`
    }
    const paymentAmount = this.calculatePayment();

    const promise2 = this.chargeEmployer({
      phoneNumber: this.props.profile.phone,
      // phoneNumber: "+80034565780",
      amount: paymentAmount,
      metadata: metadata,
      currency: process.env.REACT_APP_PROD_CURRENCY
    })

    let promise3;
    if (this.state.job.type === 'Project') {
      const projectId = uuidv4();
    promise3 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
        method: 'POST',
        body: JSON.stringify({
          id: projectId,
          employerId: this.state.job.userId,
          freelancerId: this.state.application.userId,
          transactionId: this.state.transactionId,
          title: this.state.job.title,
          rate: this.state.job.rate,
          milestoneTitle1: 'Milestone Name',
          milestoneConditions1: 'You can enter the Milestone conditions here.',
          milestoneRate1: '',
          milestoneComplete1: false,

          milestoneTitle2: 'Milestone Name',
          milestoneConditions2: 'You can enter the Milestone conditions here.',
          milestoneRate2: '',
          milestoneComplete2: false,

          milestoneTitle3: 'Milestone Name',
          milestoneConditions3: 'You can enter the Milestone conditions here.',
          milestoneRate3: '',
          milestoneComplete3: false,

          milestoneTitle4: 'Milestone Name',
          milestoneConditions4: 'You can enter the Milestone conditions here.',
          milestoneRate4: '',
          milestoneComplete4: false,

          milestoneTitle5: 'Milestone Name',
          milestoneConditions5: 'You can enter the Milestone conditions here.',
          milestoneRate5: '',
          milestoneComplete5: false,

          projectComplete: false,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.props.accessToken
        },
      })
    } else {
      promise3 = console.log('No project milestones needed')
    }

    const promise4 = fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs/${this.state.job.id}/apps/${this.state.application.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          file: true,
        }),
        headers: {
          'x-access-token': this.props.accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

    const promise5 = this.sendFreelancerConfirmation({
      message: `Your application for ${this.state.job.title} on Work & Rise has been confirmed. Log in at https://platform.workandrise.today for the details.`,
      phone: this.state.profile.phone
    })


    promise1.then(() => promise2).then(() => promise3).then(() => promise4).then(() => promise5)
  }

  calculatePayment = () => {
    const jobType = this.state.job.type;
    let paymentAmount;
        switch(jobType) {
          case 'Hourly':
            paymentAmount = parseInt(this.state.job.duration, 10) * parseInt(this.state.job.rate, 10) * 1.04 + 1000;
            return paymentAmount;
          case 'Daily':
            paymentAmount = parseInt(this.state.job.rate, 10) * 1.04 + 1000;
            return paymentAmount;
          case 'Project':
            paymentAmount = parseInt(this.state.job.rate, 10) * 1.04 + 3500;
            return paymentAmount;
          case 'Task':
            paymentAmount = parseInt(this.state.job.rate, 10) * parseInt(this.state.job.numberOfTasksRequested, 10) * 1.04 + 1000;
            return paymentAmount;
          default:
            break;
        }

  }


 handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      showModal: false,
     });

    try {
       await this.createTransaction();
    }
    catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    this.props.history.push('/');
  }

  render() {
    const btn ={backgroundColor: '#fdd835', color: 'black'};
    const thread = this.state.job.userId + '_' + this.state.application.userId;
    return(
      <React.Fragment>
        <ListGroup>
          <PageHeader>{this.state.job.title}</PageHeader>
          <Row>
            <Col style={{paddingRight: '2.5px'}} xs={6} md={6} lg={6}>
              <ViewProfileButton profile={this.state.profile} />
            </Col>
            <Col style={{paddingLeft: '2.5px'}} xs={6} md={6} lg={6}>
              <MessageButton threadId={thread} userToken={this.props.userToken}/>

            </Col>
          </Row>
          <br />
          <ListGroupItem><i>{this.state.profile.firstName} {this.state.profile.lastName}</i></ListGroupItem>
          <ListGroupItem><b>Qualifications</b></ListGroupItem>
          <ListGroupItem>{this.state.application.qualifications}</ListGroupItem>
            <ListGroupItem><b>Question Responses</b></ListGroupItem>
          <ListGroupItem>{this.state.application.interviewQuestions}</ListGroupItem>
          <ListGroupItem><b>Proposal</b>: {this.state.application.rateProposal}</ListGroupItem>
          <ListGroupItem><b>Date Available</b>: {this.state.application.dateAvailable}</ListGroupItem>
        </ListGroup>
        <h1>Deposit Required: { this.calculatePayment() } UGX in Escrow</h1>
        <h1>Work&Rise charges Employers an additional 4% UGX surcharge to cover server costs, salaries & payment processing fees. <br /><br />To create the transaction, please click on the button below. You will receive a message to your MobileMoney-linked phone number to approve the transaction. <br /><br /> Once your payment has been received by Work & Rise, the freelancer will receive a text message informing them that they are now able to begin work.</h1>

        <LoaderButton
          block
          style={btn}
          bsSize="large"
          onClick={this.openModal}
          isLoading={this.state.isLoading}
          text="Confirm Contract & Create Job"
          loadingText="Loading..."
        />
      <ConfirmModal
        openModal={this.openModal}
        closeModal={this.closeModal}
        showModal={this.state.showModal}
        modalTitle="Confirm Contract Creation"
        modalMessage="Clicking the 'Confirm' button below will create the contract between you & the freelancer, and will send a payment request to you for deposit of Escrow payment through MobileMoney."
        modalMessage2="Are you ready to proceed?"
        modalFunction={this.handleSubmit}
        parent="Application"
      />
    </React.Fragment>
    );
  }
}
