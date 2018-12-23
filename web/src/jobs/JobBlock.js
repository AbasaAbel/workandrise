import React, { Component } from "react";
import JobModal from "./JobModal";
import BlockButtons from "./BlockButtons";
import './JobBlock.css';

export default class JobBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
      this.setState({ showModal: true });
    }

  closeModal = () => {
    this.setState({ showModal: false });
    }

  render() {

    return (
      <React.Fragment>
            <div >
              <form onSubmit={this.handleSubmit}>                
                <div>
                    <div className="card">
                        <div className="card-header">
                          <strong style={{fontSize:15}}>
                            {this.props.title}
                          </strong>
                        </div>
                        <div className="card-body">
                          {this.props.description.substring(0,140)}...
                          <br/><br />
                          <div Style={"font-size: 16px"}>{this.props.type} Payment: {this.props.rate} UGX</div>
                          <br />
                          <BlockButtons
                            profile={this.props.userId}
                            openModal={this.openModal}
                            closeModal={this.closeModal}
                            jobId={this.props.id}
                            id={this.props.id}
                            title={this.props.title}
                            description={this.props.description}
                            type={this.props.type}
                            rate={this.props.rate}
                            duration={this.props.duration}
                            date={this.props.date}
                            industry={this.props.industry}
                            skills={this.props.skills}
                            interviewQuestions={this.props.interviewQuestions}
                            jobPrimarySkill={this.props.jobPrimarySkill}
                            jobSecondarySkill={this.props.jobSecondarySkill}
                            jobTertiarySkill={this.props.jobTertiarySkill}
                          />
                        </div>
                    </div>
                </div>
                </form>
              </div>
        <JobModal
        openModal={this.openModal}
        closeModal={this.closeModal}
        showModal={this.state.showModal}
        getJob={this.props.getJob}
        id={this.props.id}
        title={this.props.title}
        description={this.props.description}
        rate={this.props.rate}
        duration={this.props.duration}
        date={this.props.date}
        industry={this.props.industry}
        skills={this.props.skills}
        interviewQuestions={this.props.interviewQuestions}
        jobPrimarySkill={this.props.jobPrimarySkill}
        jobSecondarySkill={this.props.jobSecondarySkill}
        jobTertiarySkill={this.props.jobTertiarySkill}
        />
      </React.Fragment>
);
  }
}
