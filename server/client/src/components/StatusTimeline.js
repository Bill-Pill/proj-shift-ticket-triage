import React, { Component } from 'react';
import { connect } from "react-redux";
import { Timeline } from 'antd';

class StatusTimeline extends Component {

  render() {
    return (
      <Timeline>
        <Timeline.Item>Your ticket is sent and waiting for review 2015-09-01</Timeline.Item>
        <Timeline.Item>User is now hard at work resolving the issue 2015-09-01</Timeline.Item>
        <Timeline.Item>User has requested a response 2015-09-01</Timeline.Item>
        <Timeline.Item>Huzzah! Ticket is now resolved and closed 2015-09-01</Timeline.Item>
    </Timeline>
    )
  }
}

export default connect(null)(StatusTimeline);
