import React, { Component } from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd'

const { Step } = Steps;

class TicketProgress extends Component {
  state = {
    currentStep: 0
  };

  render() {
    return (
      <Steps current={this.state.currentStep} status="process">
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


export default connect(null)(TicketProgress);