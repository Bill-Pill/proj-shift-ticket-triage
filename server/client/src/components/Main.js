import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTickets } from "../actions"
import { Row, Col, Layout, Breadcrumb } from 'antd'
import TicketForm from './TicketForm'
import TicketProgress from './TicketProgress'

import { Timeline } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

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
              Hi I'm the main component. Ticket data below:
              {this.renderTickets()}
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>
              <div className="container-status">
                <Row type="flex" align="middle" className="row-status">
                  <Col span={20} offset={2}>
                    <TicketProgress />
                  </Col>
                  <Col span={2}></Col>
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
   tickets: state.tickets
  };
};

export default connect(mapStateToProps, { fetchTickets })(Main);