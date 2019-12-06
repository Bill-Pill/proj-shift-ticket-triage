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