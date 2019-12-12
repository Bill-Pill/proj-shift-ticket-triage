import React, { Component } from 'react';
import { connect } from "react-redux";
import { Timeline } from 'antd';
import Moment from 'react-moment';

const currentDateTime = new Date();
            
class StatusTimeline extends Component {

  renderTimelineItems() {
    if (this.props.ticketDetails[0]) {
      let timelineArr = []

      // Get ticket code and always push first timeline item
      const ticketStatusCode = this.props.ticketDetails[0].statuscode
      timelineArr.push(<Timeline.Item key='1'>{`Your ticket is sent and waiting for review at time: `}
        <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
      
      // Push timeline items based on status code
      switch (ticketStatusCode) {
        case (2):
          timelineArr.push(<Timeline.Item key='2'>{`Roger is now hard at work resolving the issue at time: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
          break;
        case (3):
          timelineArr.push(<Timeline.Item key='2'>{`Roger is now hard at work resolving the issue at time: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
          timelineArr.push(<Timeline.Item key='3'>{`Roger has requested a response at time: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
          break;
        case (4):
          timelineArr.push(<Timeline.Item key='2'>{`Roger is now hard at work resolving the issue at time: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
          timelineArr.push(<Timeline.Item key='3'>{`Roger has requested a response at time: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
          timelineArr.push(<Timeline.Item key='4'>{`Huzzah! Ticket is now resolved and closed at: `}
          <Moment format="LLL">{currentDateTime}</Moment></Timeline.Item>)
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