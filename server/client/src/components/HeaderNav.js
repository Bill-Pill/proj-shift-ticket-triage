import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon } from 'antd';
import { loginToStore, logOutOfStore } from "../actions"

const { Header } = Layout;

const logoStyle = {
  fontFamily: 'Raleway',
  fontSize: '30px',
  color: 'gray',
  width: '120px',
  height: '31px',
  background: 'rgba(255, 255, 255, 0.2)',
  margin: '16px 24px 16px 0',
  display: 'inline-block'
}

class HeaderNav extends Component {

  render() {
    return (
      <Header>
        <div className="logo" style={logoStyle}>WIP
          <Icon type="plus-square" theme="filled" 
            style={{display:'inline', fontSize: '30px'}}/>TRIAGE</div>
          <Menu
            theme="dark"
            mode="horizontal"
            breakpoint={'xs'}
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', marginRight: '250px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
    </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
   auth: state.auth
  };
};

export default connect(mapStateToProps, { loginToStore, logOutOfStore })(HeaderNav);