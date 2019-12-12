import React, { Component } from 'react';
import { connect } from "react-redux";
import Media from 'react-media'
import { Steps, Button, Row, Col } from 'antd'
import { updateTicketStatus } from '../actions'
import io from 'socket.io-client'
const socket = io()

const { Step } = Steps;

class TicketProgress extends Component {
    constructor(props) {
    super(props);

    this.state = {
      stepStatus: 'process',
      message: '',
      responseVisible: false,
      demoUserResponse: ''
    };
  }

  componentDidMount () {
    socket.on('demo increment', ticketid => {
      if (ticketid === this.props.ticketDetails[0].ticketid && 
        this.props.ticketDetails[0].statuscode === 0) {
            console.log('incrementing demo step on client')
            this.incrementTimedDemoStepToResponse()
      }
      // Sets demo response to state if complete ticket found
      if (this.props.ticketDetails[0] && this.props.ticketDetails[0].demoresponse) {
        this.setState({demoUserResponse: this.props.ticketDetails[0].demoresponse})
      }
    })
  }

  componentDidUpdate() {
    // sent emit code for demo start after 5 seconds if ticket loaded and status code at 0
    if (this.props.ticketDetails && this.props.ticketDetails[0] && this.props.ticketDetails[0].statuscode===0) {
      // wait a few seconds before starting demo
      setTimeout(() => {
        socket.emit('start demo', this.props.ticketDetails[0].ticketid)
      }, 4000)
      
    }

  }

  toggleResponseForm = () => {
    this.setState({responseVisible: (!this.state.responseVisible)})
  }

  onResponseClick = () => {
    if (this.props.ticketDetails[0]) {
      const ticketid = this.props.ticketDetails[0].ticketid
      console.log('os sent ', this.state.message)
      socket.emit('demo user response', ticketid, this.state.message)
      this.toggleResponseForm()
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

  // Logic triggering on demo start
  incrementTimedDemoStepToResponse = () => {
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
        if (currentStep >= 2) {
          console.log('demo pausing')
          this.setState({stepStatus: 'error'})
          this.toggleResponseForm()
          clearInterval(intervalId)
        }
      }, 2500)
    }

  }

  onChange = (e) => {
    let value = e.target.value
    this.setState({message: value})
  }

  render() {
    console.log('progress bar render props ', this.props)
    return (
      <div>
        <Row type="flex" justify="space-around" align="top">
          <Col span={8}></Col>
          <Col span={8}>
            {this.state.responseVisible ? (
              <div>
                <h3>Response Requested</h3>
                <label>Hey there - I'm working on your ticket now. Can you help by typing in your OS below and submit your reponse?</label>
                <div>
                  <input
                onChange={this.onChange}
                className="inputMessage" 
                placeholder="I.E. Windows 7, MacOS10, etc"
                style={{paddingBottom: '20px', width: '250px'}}
                />
                <Button onClick={this.onResponseClick}
                  style={{marginBottom: '100px'}}>Submit Response</Button>
                </div>
              </div>
            ) : null }
          </Col>
          <Col span={8}></Col>
        </Row>
        <Media query={{ maxWidth: 1199 }}>
          {matches =>
            matches ? (
        <Steps direction="vertical" current={this.currentStep()} status={this.state.stepStatus}>
          <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
          <Step title="Resolving Issue" description="(USERNAME) is now hard at 
            work resolving the issue. --------------------
            ----------------- **COLORCHANGE** (USERNAME) is
            typing up a response"/>
          <Step title="Response Requested" description="(USERNAME) has requested a response" />
          <Step title="Issue Resolved" description={this.state.demoUserResponse} />
        </Steps>
                  
            ) : (
              <Steps current={this.currentStep()} status={this.state.stepStatus}>
                <Step title="Ticket Sent" description="Your ticket is sent and waiting for review" />
                <Step title="Resolving Issue" description="(USERNAME) is now hard at 
                  work resolving the issue. --------------------
                  ----------------- **COLORCHANGE** (USERNAME) is
                  typing up a response"/>
                <Step title="Response Requested" description="(USERNAME) has requested a response" />
                <Step title="Issue Resolved" description={this.state.demoUserResponse} />
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