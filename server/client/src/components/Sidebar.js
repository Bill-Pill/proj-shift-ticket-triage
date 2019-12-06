import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Breadcrumb, Form, Input, Row, Col } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


class SubmitTicket extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


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
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ticket Triage!</Footer>
        </Layout>
        <Sider width={500} reverseArrow
          collapsible collapsed={this.state.collapsed} 
          onCollapse={this.onCollapse}>
          <div>
            <Row>
              <Col span={20} offset={2}>
              </Col>
            </Row>
          </div>
        </Sider>
      </Layout>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   //  tickets: state.tickets
//   state
//   };
// };

export default (connect(null)(SubmitTicket));