import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon, Modal, Button } from 'antd';
import Media from 'react-media'
import { loginToStore, logOutOfStore, loginAsDemo } from "../actions"

const { Header } = Layout;

const logoStyle = {
  fontFamily: 'Raleway',
  fontSize: '30px',
  color: 'gray',
  width: '120px',
  height: '31px',
  background: 'rgba(255, 255, 255, 0.2)',
  margin: '16px 24px 16px 0',
  display: 'inline-block',
  float: 'left'
}

class HeaderNav extends Component {

  state = {
    collapsed: false,
    visible: false
  };

  componentDidMount() {
    if (!this.props.auth.username) {
      this.showModal()
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleDemoLoginClick = () => {
    this.props.loginAsDemo()
    this.setState({
      visible: false
    })

  }

  render() {
    return (
      <Header>
        <div className="logo" style={logoStyle}>WIP
          <Icon type="plus-square" theme="filled" 
            style={{display:'inline', fontSize: '30px'}}/>TRIAGE</div>

        <Media query={{ maxWidth: 768 }}>
          {matches =>
            matches ? (
              
              <Menu
                    theme="dark"
                    mode="horizontal"
                    breakpoint={'xs'}
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'left' }}
                  >
                    <Menu.Item key="1">Tickets</Menu.Item>

                  </Menu>
                  
            ) : (
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    breakpoint={'xs'}
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'right', marginRight: '250px' }}
                  >
                    <Menu.Item key="1">Tickets</Menu.Item>

                  </Menu>
            )
          }
        </Media>
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
    </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
   auth: state.auth
  };
};

export default connect(mapStateToProps, { loginToStore, logOutOfStore, loginAsDemo })(HeaderNav);