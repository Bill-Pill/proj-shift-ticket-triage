import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col, Layout } from 'antd'
import TicketForm from './TicketForm'


const { Sider } = Layout;

class SiderRight extends Component {
  state = {
    collapsed: true,
    visible: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    console.log('main render props ', this.props)
    return (
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
    );
  }
}

export default connect(null)(SiderRight);