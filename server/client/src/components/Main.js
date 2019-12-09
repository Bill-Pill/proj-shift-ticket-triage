import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginToStore, logOutOfStore, loginAsDemo } from "../actions"
import { Row, Col, Layout, Breadcrumb, Menu, Icon } from 'antd'
import TicketForm from './TicketForm'
import SiderRight from './SiderRight'
import { Modal, Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { SubMenu } = Menu;

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

  handleTest = () => {
    alert('handling modal button click')
    this.setState({
      visible: false,
    });
  }

  handleDemoLoginClick = (callback) => {
    this.props.loginAsDemo(() => {
      this.props.history.push('/tickets')
    })
    this.setState({
      visible: false
    })

  }

  handleLogout = () => {
    this.props.logOutOfStore(() => {
      this.props.history.push('/')
      this.setState({
        visible: true,
      });
    })
  }

  componentDidMount() {
    if (!this.props.auth.username) {
      this.showModal()
    }

    if (this.props.auth.isDemo) {
      alert("Welcome to the demo!")
    }
  }

  render() {
    console.log('main render props ', this.props)
    return (

      <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Hi I'm the main component.
              <Button onClick={this.handleLogout}>
                Logout
              </Button>
                <Modal
                  visible={this.state.visible}
                  title="Title"
                  footer={[
                    // <Button key="adminlogin" type="danger"
                    //   onClick={this.handleLogin}>
                    //   Login as Admin
                    // </Button>,
                    // <Button key="userlogin" type="primary" 
                    //   onClick={this.handleTest}>
                    //   Login as User
                    // </Button>,
                    <Button key="demologin" type="primary" 
                      onClick={this.handleDemoLoginClick}>
                      Demo!
                    </Button>
                  ]}
                >
                  <p>Don't worry - you won't break anything.</p>
                </Modal>
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
   auth: state.auth
  };
};

export default connect(mapStateToProps, { loginToStore, logOutOfStore, loginAsDemo })(Main);