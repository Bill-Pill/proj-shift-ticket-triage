import React, { Component } from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd'

const { Step } = Steps;

class TicketProgress extends Component {

  render() {
    return (
        <div className="container-status">
          <Row type="flex" align="middle" className="row-status">
            <Col span={20} offset={2}>
              <h3>Step progress bar changes to vertical on mobile. Animations??</h3>
              <Steps current={2} status="error">
                <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
                <Step title="Resolving Issue" description="(USERNAME) is now hard at 
                  work resolving the issue. --------------------
                  ----------------- **COLORCHANGE** (USERNAME) is
                  typing up a response"/>
                <Step title="Response Requested" description="(USERNAME) has requested a response" />
                <Step title="Issue Resolved" description="Huzzah! Ticket is now resolved and closed" />
              </Steps>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
    );
  }
}


export default connect(null)(TicketProgress);