import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTickets } from "../actions"
import { Steps, Row, Col } from 'antd'

class Main extends Component {

  componentDidMount() {
    this.props.fetchTickets()
  }

  renderTickets() {
    const items = []
    const { tickets } = this.props;
    tickets.forEach(t => {
      items.push(<div key={t.ticketid}>{t.title}</div>)
    })

    return items
  }

  render() {
    const { Step } = Steps;

    return (
      <div>
        Hi I'm the main component. Ticket data below:
        {this.renderTickets()}
        <div className="container-status">
        <Row type="flex" align="middle" className="row-status">
            <Col span={20} offset={2}>
              <Steps current={2} status="error">
                <Step title="Ticket Sent" description="Your ticket is on it's way!" />
                <Step title="Under Review" description="(USERNAME HERE) is currently reviewing your ticket" />
                <Step title="Response Requested" description="(USERNAME) has requested a response" />
                <Step title="Resolving Issue" description="(USERNAME) is now hard at work resolving the issue)" />
                <Step title="Waiting" description="This is a description" />
                <Step title="Waiting" description="This is a description" />
              </Steps>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets
  };
};

export default connect(mapStateToProps, { fetchTickets })(Main);