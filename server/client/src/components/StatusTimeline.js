import React, { Component } from 'react';
import { connect } from "react-redux";
import { Timeline } from 'antd';

class StatusTimeline extends Component {

  renderTimelineItems() {
    if (this.props.ticketDetails[0]) {
      let timelineArr = []

      // Get ticket code and always push first timeline item
      const ticketStatusCode = this.props.ticketDetails[0].statuscode
      timelineArr.push(<Timeline.Item>Your ticket is sent and waiting for review 2015-09-01</Timeline.Item>)
      
      // Push timeline items based on status code
      switch (ticketStatusCode) {
        case (1):
          timelineArr.push(<Timeline.Item>User is now hard at work resolving the issue 2015-09-01</Timeline.Item>)
          break;
        case (2):
          timelineArr.push(<Timeline.Item>User is now hard at work resolving the issue 2015-09-01</Timeline.Item>)
          timelineArr.push(<Timeline.Item>User has requested a response 2015-09-01</Timeline.Item>)
          break;
        case (3):
          timelineArr.push(<Timeline.Item>User is now hard at work resolving the issue 2015-09-01</Timeline.Item>)
          timelineArr.push(<Timeline.Item>User has requested a response 2015-09-01</Timeline.Item>)
          timelineArr.push(<Timeline.Item>Huzzah! Ticket is now resolved and closed 2015-09-01</Timeline.Item>)
          break;
      }
      return (
        timelineArr
      )
    }
  }

  render() {
    return (
      <Timeline>
        {this.renderTimelineItems()}
        {/* <Timeline.Item>Your ticket is sent and waiting for review 2015-09-01</Timeline.Item>
        <Timeline.Item>User is now hard at work resolving the issue 2015-09-01</Timeline.Item>
        <Timeline.Item>User has requested a response 2015-09-01</Timeline.Item>
        <Timeline.Item>Huzzah! Ticket is now resolved and closed 2015-09-01</Timeline.Item> */}
      </Timeline>
    )
  }
}

const mapStateToProps = state => {
  return {
   ticketDetails: state.details
  };
};

export default connect(mapStateToProps)(StatusTimeline);