import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTicketDetails } from "../actions"
import { Row, Col, Layout, Breadcrumb, Button, Input } from 'antd'
import StatusTimeline from './StatusTimeline'
import TicketProgress from './TicketProgress'
import SiderRight from './SiderRight'

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
  


  renderTicketDetails() {
    if (this.props.ticketDetails[0]) {
      const ticketDetails = this.props.ticketDetails[0]
      return (
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}>
          </Col>
          <Col span={8}>
            <div className='details' style={{textAlign: "center"}}>
              <div><strong>Title:</strong> {ticketDetails.title}</div>
              <div><strong>Category:</strong> {ticketDetails.category}</div>
              <div><strong>User:</strong> Demo User</div>
              <div><strong>Department:</strong> {ticketDetails.department}</div>
              <div><strong>Details:</strong> {ticketDetails.ticketdetails}</div>
            </div>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
        
      )
    }
  }

  

  render() {
    return (
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
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