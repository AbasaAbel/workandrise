import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "./LoaderButton";
// import JobRegistrationForm from '../auth/JobsRegistration';
import GraduateRegistrationForm from '../auth/GraduateRegistration';


export default class Sandbox extends Component {
  constructor(props) {
    super(props);

    this.pendingRequests = 0;

    this.state = {
      showModal: false,
      transaction: [],
      metadata: [],
      phone: [],
      isLoading: null
    }

    // this.beyonicMilestoneTransaction = this.beyonicMilestoneTransaction.bind(this)

  }

  openModal = () => {
      this.setState({ showModal: true });
    }

  closeModal = () => {
    this.setState({ showModal: false });
    }

  chargeEmployer(payment) {
    return API.post('wr-messaging', '/beyonic/charge-employer', {
      body: payment
    })
  }

  payFreelancer(payment) {
    return API.post('wr-messaging', '/beyonic/pay-freelancer', {
      body: payment
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    // this.setState({
    //   isLoading: true,
    //   showModal: false,
    //  });

    const metadata = {
      'recipient': `7c391786-dd7b-418a-b444-9810560b98a9`,
      'sender': `Latest7`,
      'job': `Latest7`,
      'transaction': `Latest7`,
      'phone': `"+256772340576`
    }

    try {
      await this.chargeEmployer({
        firstName: 'Michael',
        lastName: 'Test',
        phoneNumber: "+256772340576",
        amount: 250000,
        metadata: metadata,
        currency: process.env.REACT_APP_PROD_CURRENCY
      });
    }
    catch (e) {
      console.log(e)
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  // handleSubmit = async event => {
  //    event.preventDefault();
  //    // this.setState({
  //    //   isLoading: true,
  //    //   showModal: false,
  //    //  });

  //    const metadata = {
  //      'recipient': `8f6c4b41-8ec6-4f90-b0ad-375174c1d073`,
  //      'sender': `Latest7`,
  //      'job': `Latest7`,
  //      'transaction': `Latest7`,
  //      'phone': `16508687480`
  //    }

  //    try {
  //       await this.chargeEmployer({
  //         firstName: 'Michael',
  //         lastName: 'Litchev',
  //         phoneNumber: "+80034565780",
  //         amount: 3000,
  //         metadata: metadata,
  //         currency: process.env.REACT_APP_DEV_CURRENCY
  //       });
  //    }
  //    catch (e) {
  //      console.log(e)
  //      alert(e);
  //      this.setState({ isLoading: false });
  //    }
  //  }

  // beyonicMilestoneTransaction() {
  //   const url = 'https://app.beyonic.us/api/collectionrequests';
  //
  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       first_name: 'Michael',
  //       last_name: 'Test',
  //       phonenumber: +8000000000,
  //       // phonenumber: this.state.projectTransactionInfo.freelancerPhone,
  //       currency: `${process.env.REACT_APP_PROD_CURRENCY}`,
  //       amount: 20000,
  //       description: 'Beyonic TopUp',
  //       payment_type: 'money'
  //     }),
  //     headers: {
  //       'Authorization': `Token ${process.env.REACT_APP_SECRET_CODE}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   }).then((responseText) => {
  //     document.getElementById('transaction-pending').click()
  //     return responseText;
  //   })
  //     .then((responseText) => {
  //       var response = responseText.json();
  //       response.then((response) => {
  //         this.setState({
  //           transaction: response,
  //           metadata: response.metadata,
  //           phone: response
  //         });
  //
  //       });
  //       return response;
  //     })
  //     .then((data) => {
  //       if (data.id > 0) {
  //         document.getElementById('transaction-success').click()
  //         return data;
  //       } else {
  //         document.getElementById('transaction-failure').click()
  //         return data;
  //       }
  //     }).catch((error) => {
  //       console.log('Beyonic Fetch Error: ', error)
  //       // document.getElementById('transaction-failure').click();
  //     })
  // }

  render() {
    return (
      <React.Fragment>
        <PageHeader>Sandbox</PageHeader>
        <h2>---------------------------------</h2>
        <GraduateRegistrationForm />
        {/* <JobRegistrationForm /> */}

        <LoaderButton
          block
          bsSize="large"
          // disabled
          onClick={this.handleSubmit}
          isLoading={this.state.isLoading}
          text="Charge Employer"
          loadingText="Submitting..."
        />
        {/* <button onClick={this.handleSubmit}>Try SLS Function</button> */}
        {/* <ConfirmModal
          showModal={this.state.showModal}
          modalTitle={'Terms of Service'}
          modalMessage={'In order to access Work&Rise as an employer or freelancer, you agree to the terms below:'}
          paperwork='Privacy'
          closeModal={this.closeModal}
          parent="TOS"
          modalFunction={this.closeModal}
        /> */}
      </React.Fragment>
    )
  }
}
