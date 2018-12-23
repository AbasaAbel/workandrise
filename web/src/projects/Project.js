import React, { Component } from "react";
import Milestone from "./Milestone";
import { API } from "aws-amplify";

import { PageHeader } from "react-bootstrap";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      project: [],
      projectTransactionInfo: [],

    }

    // this.getProject = this.getProject.bind(this);
    this.updateMilestone1 = this.updateMilestone1.bind(this);
    this.updateMilestone2 = this.updateMilestone2.bind(this);
    this.updateMilestone3 = this.updateMilestone3.bind(this);
    this.updateMilestone4 = this.updateMilestone4.bind(this);
    this.updateMilestone5 = this.updateMilestone5.bind(this);
    this.getProject = this.getProject.bind(this);
    this.completeMilestone1 = this.completeMilestone1.bind(this)
    this.completeMilestone2 = this.completeMilestone2.bind(this)
    this.completeMilestone3 = this.completeMilestone3.bind(this);
    this.completeMilestone4 = this.completeMilestone4.bind(this);
    this.completeMilestone5 = this.completeMilestone5.bind(this);
    this.verifyTransactionAmount = this.verifyTransactionAmount.bind(this);



  }

async componentDidMount() {
    try {
      this.getProject()
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  payFreelancer(payment) {
    return API.post('wr-messaging', '/beyonic/pay-freelancer', {
      body: payment
    })
  }

  getProject = () => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}${window.location.pathname}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then((responseText) => {
      var response = responseText.json();
      response.then((response) => {
        this.setState({
          project: response[0],
          projectTransactionInfo: response[0].transactionInfo

        });
      });
    })
  }

  updateMilestone1 = (title, description, rate) => {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneTitle1: title,
        milestoneConditions1: description,
        milestoneRate1: rate,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    }).catch((error) => {
      document.getElementById('database-failure').click();
    })
  }

  updateMilestone2(title, description, rate) {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneTitle2: title,
        milestoneConditions2: description,
        milestoneRate2: rate,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    }).catch((error) => {
      document.getElementById('database-failure').click();
    })
  }

  updateMilestone3(title, description, rate) {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneTitle3: title,
        milestoneConditions3: description,
        milestoneRate3: rate,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    }).catch((error) => {
      document.getElementById('database-failure').click();
    })
  }

  updateMilestone4(title, description, rate) {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneTitle4: title,
        milestoneConditions4: description,
        milestoneRate4: rate,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    }).catch((error) => {
      document.getElementById('database-failure').click();
    })
  }

  updateMilestone5(title, description, rate) {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneTitle5: title,
        milestoneConditions5: description,
        milestoneRate5: rate,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    }).catch((error) => {
      document.getElementById('database-failure').click();
    })
  }


  verifyTransactionAmount(milestoneRate) {

    const txInfo = this.state.projectTransactionInfo;

    const oldEscrow = txInfo.escrowLeft;
    const newEscrow = (oldEscrow - milestoneRate)



    if (milestoneRate >= txInfo.escrowLeft) {
      throw new Error (`The Milestone Rate you are attempting to submit is greater than or equal to the amount of money you have deposited into the Work & Rise escrow account for this transaction. Please enter a milestone rate that is at least 1 UGX less than ${txInfo.escrowLeft} UGX.`)
    } else {
      fetch(`${process.env.REACT_APP_PROD_SERVER}/transactions`, {
        method: 'PUT',
        body: JSON.stringify({
          transactionId: txInfo.id,
          escrowLeft: newEscrow,
        }),
        headers: {
          'x-access-token': this.props.accessToken,
          'Content-Type': 'application/json'
        }
      }).then(data => {
        document.getElementById('database-success').click();
        this.getProject()
      }).catch((error) => {
        document.getElementById('database-failure').click();
      })
    }
  }

  beyonicMilestoneTransaction(milestoneRate) {

      this.payFreelancer({
              firstName: this.state.projectTransactionInfo.freelancerFirstName,
              lastName: this.state.projectTransactionInfo.freelancerLastName,
              // phoneNumber: +80034565780,
              phoneNumber: this.state.projectTransactionInfo.freelancerPhone,
              currency: `${process.env.REACT_APP_PROD_CURRENCY}`,
              amount: milestoneRate * 0.95,

      })
      .then((responseText) => {
        document.getElementById('transaction-pending').click()
        return responseText;
      }).then((responseText) => {
      var response =  responseText.json();
      response.then((response) => {
        console.log(response);
        this.setState({
          transaction: response
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
    }).then((data) => {
      this.getProject()
    }).catch((error) => {
      console.log('Beyonic Error: ', error)
    })
  }

  completeMilestone1(milestoneRate) {

    const promise1 = this.verifyTransactionAmount(milestoneRate);


    const promise2 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneComplete1: true,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    })

    const promise3 = this.beyonicMilestoneTransaction(milestoneRate)

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values)
    })
  }

  completeMilestone2(milestoneRate) {

    const promise1 = this.verifyTransactionAmount(milestoneRate);

    const promise2 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneComplete2: true,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    })

    const promise3 = this.beyonicMilestoneTransaction(milestoneRate);

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values)
    })
  }

  completeMilestone3(milestoneRate) {

    const promise1 = this.verifyTransactionAmount(milestoneRate);

    const promise2 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneComplete3: true,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    })

    const promise3 = this.beyonicMilestoneTransaction(milestoneRate);

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values)
    })
  }

  completeMilestone4(milestoneRate) {

    const promise1 = this.verifyTransactionAmount(milestoneRate);

    const promise2 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneComplete4: true,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    })

    const promise3 = this.beyonicMilestoneTransaction(milestoneRate);

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values)
    })
  }

  completeMilestone5(milestoneRate) {

    const promise1 = this.verifyTransactionAmount(milestoneRate);

    const promise2 = fetch(`${process.env.REACT_APP_PROD_SERVER}/projects`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.project.id,
        milestoneComplete5: true,
      }),
      headers: {
        'x-access-token': this.props.accessToken,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.getProject()
    })

    const promise3 = this.beyonicMilestoneTransaction(milestoneRate);

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values)
    })
  }


  render() {

    const m1 = parseInt(this.state.project.milestoneRate1, 10)
    const m2 = parseInt(this.state.project.milestoneRate2, 10)
    const m3 = parseInt(this.state.project.milestoneRate3, 10)
    const m4 = parseInt(this.state.project.milestoneRate4, 10)
    const m5 = parseInt(this.state.project.milestoneRate5, 10)

    const headStyle = {
      textAlign: 'left',
      paddingBottom: '20px',
      paddingLeft: '10px'
    }


    return(
      <React.Fragment>
        <PageHeader>{this.state.project.title}</PageHeader>
        <h4 style={headStyle}>Transaction Escrow: {this.state.projectTransactionInfo.escrowLeft} UGX</h4>
        <Milestone
          id={1}
          rate={m1}
          title={this.state.project.milestoneTitle1}
          description={this.state.project.milestoneConditions1}
          complete={this.state.project.milestoneComplete1}
          updateMilestone={this.updateMilestone1}
          accessToken={this.props.accessToken}
          completeMilestone={this.completeMilestone1}
          username={this.props.username}
          employerId={this.state.projectTransactionInfo.employerId}
        />
        <Milestone
          id={2}
          rate={m2}
          title={this.state.project.milestoneTitle2}
          description={this.state.project.milestoneConditions2}
          complete={this.state.project.milestoneComplete2}
          updateMilestone={this.updateMilestone2}
          accessToken={this.props.accessToken}
          completeMilestone={this.completeMilestone2}
          username={this.props.username}
          employerId={this.state.projectTransactionInfo.employerId}
        />
        <Milestone
          id={3}
          rate={m3}
          title={this.state.project.milestoneTitle3}
          description={this.state.project.milestoneConditions3}
          complete={this.state.project.milestoneComplete3}
          updateMilestone={this.updateMilestone3}
          accessToken={this.props.accessToken}
          completeMilestone={this.completeMilestone3}
          username={this.props.username}
          employerId={this.state.projectTransactionInfo.employerId}
        />
        <Milestone
          id={4}
          rate={m4}
          title={this.state.project.milestoneTitle4}
          description={this.state.project.milestoneConditions4}
          complete={this.state.project.milestoneComplete4}
          updateMilestone={this.updateMilestone4}
          accessToken={this.props.accessToken}
          completeMilestone={this.completeMilestone4}
          username={this.props.username}
          employerId={this.state.projectTransactionInfo.employerId}
        />
        <Milestone
          id={5}
          rate={m5}
          title={this.state.project.milestoneTitle5}
          description={this.state.project.milestoneConditions5}
          complete={this.state.project.milestoneComplete5}
          updateMilestone={this.updateMilestone5}
          accessToken={this.props.accessToken}
          completeMilestone={this.completeMilestone5}
          username={this.props.username}
          employerId={this.state.projectTransactionInfo.employerId}
        />

      </React.Fragment>
    )
  }
}
