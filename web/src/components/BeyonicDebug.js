import React, { Component } from "react";

export default class BeyonicDebug extends Component {
  render() {
    return(
      <h2>Error Handling</h2>
      <h1>Phone Number: {this.state.phone.phonenumber}</h1>
      <h2>Success Messages</h2>
      <h1>Transaction Account: {this.state.transaction.account}</h1>
      <h1>Transaction Amount: {this.state.transaction.ammount}</h1>
      <h1>Author ID: {this.state.transaction.author}</h1>
      <h1>Currency: {this.state.transaction.currency}</h1>
      <h1>Cancelled By: {this.state.transaction.cancelled_by}</h1>
      <h1>Cancelled For: {this.state.transaction.cancelled_reason}</h1>
      <h1>Description: {this.state.transaction.description}</h1>
      <h1>Transaction ID: {this.state.transaction.id}</h1>
      // <h1>Metadata ID: {this.state.transaction.metadata.id}</h1>
      <h1>Organization ID: {this.state.transaction.organization}</h1>
      <h1>Rejected By: {this.state.transaction.rejected_by}</h1>
      <h1>Rejected Reasons: {this.state.transaction.rejected_reasons}</h1>
      <h1>Rejected Time: {this.state.transaction.rejected_time}</h1>
    )
  }
}
