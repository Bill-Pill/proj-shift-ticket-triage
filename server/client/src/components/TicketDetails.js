import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTicketDetails } from "../actions"
import { Row, Col, Layout, Breadcrumb } from 'antd'
import TicketForm from './TicketForm'
import StatusTimeline from './StatusTimeline'
import TicketProgress from './TicketProgress'

const { Header, Content, Footer, Sider } = Layout;


class TicketDetails extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    const ticketid = this.props.match.params.ticketid
    this.props.fetchTicketDetails(ticketid)
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
    console.log('detail props ', this.props)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
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
        <Sider width={350} reverseArrow
          collapsible collapsed={this.state.collapsed} 
          onCollapse={this.onCollapse}>
          <div>
            <Row>
              <Col span={20} offset={2}>
                <TicketForm />
              </Col>
            </Row>
          </div>
        </Sider>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
   ticketDetails: state.details
  };
};

export default connect(mapStateToProps, {fetchTicketDetails})(TicketDetails);