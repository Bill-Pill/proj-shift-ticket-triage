import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTicketDetails } from "../actions"
import { Row, Col, Layout, Breadcrumb, Button, Input } from 'antd'
import StatusTimeline from './StatusTimeline'
import TicketProgress from './TicketProgress'
import SiderRight from './SiderRight'
import SocketChatDrawer from './SocketChatDrawer'
import io from 'socket.io-client'
const socket = io()

const { Header, Content, Footer } = Layout;


class TicketDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    const ticketid = this.props.match.params.ticketid
    this.props.fetchTicketDetails(ticketid)

    this.isDemoUser()
  }

  isDemoUser = () => {
    if (this.props.auth.username && this.props.auth.isDemo) {
      console.log("Confirmed as demo user!")
    }
  }
  onChange = (e) => {
    let value = e.target.value
    this.setState({message: value})
  }

  onResponseClick = () => {
    if (this.props.ticketDetails[0]) {
      const ticketid = this.props.ticketDetails[0].ticketid
      console.log('os sent ', this.state.message)
      socket.emit('user response', ticketid, this.state.message)
    }
      
      // may not need later - allow front end to see their new messages from database
      // this.props.fetchChats()
    }
  

  renderTicketDetails() {
    if (this.props.ticketDetails[0]) {
      const ticketDetails = this.props.ticketDetails[0]
      return (
        <div className='details'>
          <div>HI HELP IM STUCK IN DETAILS</div>
          <div>{ticketDetails.title}</div>
          <div>{ticketDetails.category}</div>
          <div>{ticketDetails.ticketdetails}</div>
          <div>{ticketDetails.department}</div>
        </div>
      )
    }
  }

  sendPrompt = () => {
    if (this.props.ticketDetails[0]) {
      socket.emit('demo prompt', this.props.ticketDetails[0].ticketid)
    }
  }

  render() {
    return (
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            
          <input
            onChange={this.onChange}
            className="inputMessage" 
            placeholder="I.E. Windows 7, MacOS10, etc"
            />
            <Button onClick={this.onResponseClick}>Respond to ticket</Button>
              { this.props.ticketDetails[0] ? (
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Ticket # {this.props.ticketDetails[0].ticketid}</Breadcrumb.Item>
                <Breadcrumb.Item>Details</Breadcrumb.Item>
              </Breadcrumb>
               ) : null }
            <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
              {this.renderTicketDetails()}
              <div className="container-status">
                <Row type="flex" align="middle" className="row-status">
                  <Col span={4}>
                    <Button onClick={this.sendPrompt}>prompt user</Button>
                    <h3>Status Feed</h3>
                    <StatusTimeline />
                  </Col>
                  <Col span={20}>
                    <TicketProgress />
                  </Col>
                </Row>
              </div>
              <SocketChatDrawer />
            </div>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Ticket Triage!</Footer>
        </Layout>
        <SiderRight />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
   ticketDetails: state.details,
   auth: state.auth
  };
};

export default connect(mapStateToProps, {fetchTicketDetails})(TicketDetails);