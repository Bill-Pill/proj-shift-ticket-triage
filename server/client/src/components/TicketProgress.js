import React, { Component } from 'react';
import { connect } from "react-redux";
import { Steps } from 'antd'

const { Step } = Steps;

class TicketProgress extends Component {
  state = {
    currentStep: 0
  };

  currentStep = () => {
    if (!this.props.ticketDetails[0]) {
      return 0
    } else {
      return this.props.ticketDetails[0].statuscode
    }
  }

  render() {
    console.log('progress bar render props ', this.props)
    return (
      <Steps current={this.currentStep()} status="process">
        <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
        <Step title="Resolving Issue" description="(USERNAME) is now hard at 
          work resolving the issue. --------------------
          ----------------- **COLORCHANGE** (USERNAME) is
          typing up a response"/>
        <Step title="Response Requested" description="(USERNAME) has requested a response" />
        <Step title="Issue Resolved" description="Huzzah! Ticket is now resolved and closed" />
      </Steps>
    );
  }
}


const mapStateToProps = state => {
  return {
   ticketDetails: state.details
  };
};

export default connect(mapStateToProps)(TicketProgress);