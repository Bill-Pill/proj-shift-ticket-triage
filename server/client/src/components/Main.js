import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginToStore } from "../actions"
import { Row, Col, Layout, Breadcrumb } from 'antd'
import TicketForm from './TicketForm'
import { Modal, Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
  state = {
    collapsed: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  handleLogin = () => {
    this.props.loginToStore('admin')
    this.setState({
      visible: false
    })
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleTest = () => {
    alert('handling modal button click')
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    if (!this.props.auth.username) {
      this.showModal()
    }
  }

  render() {
    console.log('main render props ', this.props)
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
              Hi I'm the main component.
                <Modal
                  visible={this.state.visible}
                  title="Title"
                  footer={[
                    <Button key="adminlogin" type="danger"
                      onClick={this.handleLogin}>
                      Login as Admin
                    </Button>,
                    <Button key="userlogin" type="primary" 
                      onClick={this.handleTest}>
                      Login as User
                    </Button>,
                  ]}
                >
                  <p>Don't worry - you won't break anything.</p>
                </Modal>
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
   auth: state.auth
  };
};

export default connect(mapStateToProps, { loginToStore })(Main);