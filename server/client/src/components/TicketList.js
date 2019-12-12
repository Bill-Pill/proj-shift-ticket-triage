import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col, Layout, Breadcrumb } from 'antd'
import SiderRight from './SiderRight'
import TicketTable from './TicketTable'
import StatusTimeline from './StatusTimeline'

const { Content, Footer } = Layout;


class TicketList extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {

    return (
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Your Tickets</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
              <div className="container-status">
                <Row type="flex" className="row-status">
                  <Col span={20} offset={2}>
                    <TicketTable />
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


export default connect(null)(TicketList);