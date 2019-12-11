import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTicketDetails } from "../actions"
import { Row, Col, Layout, Breadcrumb, Input } from 'antd'
import StatusTimeline from './StatusTimeline'
import TicketProgress from './TicketProgress'
import SiderRight from './SiderRight'
import io from 'socket.io-client'

const { Header, Content, Footer } = Layout;

const socketUrl = 'http://10.174.69.249:5000'

class TicketDetails extends Component {


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


  handleSubmit = (e) => {
    e.preventDefault()

    const{ socket } = this.state
    const { nickname } = this.state
    socket.emit('VERIFY_USER', nickname, this.setFormUser)
  }

  handleChange = (e) => {
    this.setState({nickname:e.target.value})
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

  render() {
    const { nickname, error } = this.state
    return (
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.renderTicketDetails()}
              <div className="container-status">
                <Row type="flex" align="middle" className="row-status">
                  <Col span={4}>
                    <h3>Status Feed</h3>
                    <StatusTimeline />
                  </Col>
                  <Col span={20}>
                    <TicketProgress />
                  </Col>
                </Row>
              </div>
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