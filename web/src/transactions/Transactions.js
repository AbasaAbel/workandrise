import React, { Component } from 'react';
import TransactionList from './TransactionList';

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      transactions: [],
      jobInfo: [],
      employerTransactions: [],
      employerJobInfo: [],
    };
  }

  componentDidMount() {
    try {
      this.getTransactions();
      this.getEmployerTransactions();
    } catch (e) {
      alert(e);
    }
  }


  getTransactions() {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/transactions/freelancer/${this.props.username}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken,
      },
    })
      .then((responseText) => {
        const response = responseText.json();
        response.then((response) => {
          this.setState({
            transactions: response,
            jobInfo: response.jobInfo,
          });
        });
      });
  }

  getEmployerTransactions() {
    fetch(`${process.env.REACT_APP_PROD_SERVER}/transactions/employer/${this.props.username}`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.accessToken,
      },
    })
      .then((responseText) => {
        const response = responseText.json();
        response.then((response) => {
          this.setState({
            employerTransactions: response,
            employerJobInfo: response.jobInfo,
          });
        });
      });
  }


  render() {
    return (
      <React.Fragment>
        <TransactionList
          accessToken={this.props.accessToken}
          getTransactions={this.getEmployerTransactions}
          transactions={this.state.employerTransactions}
          job={this.state.employerJobInfo}
          type="Employer"
        />

        <TransactionList
          accessToken={this.props.accessToken}
          getTransactions={this.getTransactions}
          transactions={this.state.transactions}
          job={this.state.jobInfo}
          username={this.props.username}
          type="Freelancing"
        />
      </React.Fragment>
    );
  }
}
