import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      jobInfo: [],
    };

    this.renderTransactionList = this.renderTransactionList.bind(this);
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

  renderTransactionList(transactions) {
    return [{}].concat(transactions).map((transaction, i) => (
      i !== 0
        ? (<ListGroupItem
          key={transaction.id}
        >
          <Link to={`/transactions/${transaction.id}`}>
            <h4>
              {transaction.jobInfo.title.trim().split('\n')[0]}
            </h4>
            { `Freelancer: ${transaction.freelancerFirstName} ${transaction.freelancerLastName}`}
            {' '}
            <br />
            {`Completed: ${transaction.completed}`}
          </Link>
           </ListGroupItem>
        ) : (
          <PageHeader key={1}>
            {this.props.type}
            {' '}
Transactions
          </PageHeader>
        )
    ));
  }

  render() {
    return (
      <React.Fragment>
        <ListGroup>
          { this.renderTransactionList(this.props.transactions, this.props.job)}
        </ListGroup>
      </React.Fragment>
    );
  }
}
