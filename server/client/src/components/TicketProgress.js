import React, { Component } from 'react';
import { connect } from "react-redux";
import Media from 'react-media'
import { Steps, Button } from 'antd'
import { updateTicketStatus } from '../actions'
import io from 'socket.io-client'
const socket = io()

const { Step } = Steps;

class TicketProgress extends Component {

  componentDidMount () {
    socket.on('increment step', ticketid => {
      console.log('incrementing step on client')
      this.incrementStep()
    })
  }

  componentDidUpdate() {
    if (this.props.ticketDetails && this.props.ticketDetails[0] && this.props.ticketDetails[0].statuscode===0) {
      // wait a few seconds before starting demo
      setTimeout(() => {
        socket.emit('start demo', this.props.ticketDetails[0].ticketid)
      }, 5000)
      
    }
  }

  onResponseClick = () => {
    if (this.props.ticketDetails[0]) {
      const ticketid = this.props.ticketDetails[0].ticketid
      console.log('os sent ', this.state.message)
      socket.emit('user response', ticketid, this.state.message)
    }
  }

  currentStep = () => {
    if (!this.props.ticketDetails[0]) {
      return 0
    } else {
      return this.props.ticketDetails[0].statuscode
    }
  }

  // Sends action with correct status code based on current step
  incrementStep = () => {
    const currentStep = this.currentStep()

    if (currentStep != 4 && this.props.ticketDetails[0]) {
      const newStep = currentStep + 1;
      const ticketid = this.props.ticketDetails[0].ticketid
      this.props.updateTicketStatus(ticketid, newStep)
    }
  }

  incrementTimedStep = () => {
    let currentStep = this.currentStep()

    if(this.props.ticketDetails[0]) {
      // Interval simulating fast real-time ticket response
      const intervalId = setInterval(() => {
        console.log('currently on step ', currentStep)
        let newStep = currentStep + 1;
        const ticketid = this.props.ticketDetails[0].ticketid
        this.props.updateTicketStatus(ticketid, newStep)
        currentStep += 1
        // clear loop
        if (currentStep >= 4) {
          clearInterval(intervalId)
        }
      }, 2000)
    }
    
    // while (currentStep < 4 && this.props.ticketDetails[0]) {
    //   setTimeout(() => {
    //     console.log('currently on step ', currentStep)
    //     let newStep = currentStep + 1;
    //     const ticketid = this.props.ticketDetails[0].ticketid
    //     this.props.updateTicketStatus(ticketid, newStep)
    //     currentStep += 1
    //   },5000)
      
    
    // }
  }

  render() {
    console.log('progress bar render props ', this.props)
    return (
      <div>
        <input
            onChange={this.onChange}
            className="inputMessage" 
            placeholder="I.E. Windows 7, MacOS10, etc"
            />
            <Button onClick={this.onResponseClick}>Respond to ticket</Button>
        <Button onClick={this.incrementTimedStep}>Increment TIMED Step Test Button</Button>
        <Media query={{ maxWidth: 1199 }}>
          {matches =>
            matches ? (
        <Steps direction="vertical" current={this.currentStep()} status="process">
          <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
          <Step title="Resolving Issue" description="(USERNAME) is now hard at 
            work resolving the issue. --------------------
            ----------------- **COLORCHANGE** (USERNAME) is
            typing up a response"/>
          <Step title="Response Requested" description="(USERNAME) has requested a response" />
          <Step title="Issue Resolved" description="Huzzah! Ticket is now resolved and closed" />
        </Steps>
                  
            ) : (
              <Steps current={this.currentStep()} status="process">
                <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
                <Step title="Resolving Issue" description="(USERNAME) is now hard at 
                  work resolving the issue. --------------------
                  ----------------- **COLORCHANGE** (USERNAME) is
                  typing up a response"/>
                <Step title="Response Requested" description="(USERNAME) has requested a response" />
                <Step title="Issue Resolved" description="Huzzah! Ticket is now resolved and closed" />
              </Steps>
            )
          }
        </Media>
        {/* <Button onClick={this.incrementStep}>Increment Step Test Button</Button>
        <Button onClick={this.incrementTimedStep}>Increment TIMED Step Test Button</Button>
        <Steps direction="vertical" current={this.currentStep()} status="process">
          <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
          <Step title="Resolving Issue" description="(USERNAME) is now hard at 
            work resolving the issue. --------------------
            ----------------- **COLORCHANGE** (USERNAME) is
            typing up a response"/>
          <Step title="Response Requested" description="(USERNAME) has requested a response" />
          <Step title="Issue Resolved" description="Huzzah! Ticket is now resolved and closed" />
        </Steps> */}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
   ticketDetails: state.details
  };
};

export default connect(mapStateToProps, { updateTicketStatus })(TicketProgress);