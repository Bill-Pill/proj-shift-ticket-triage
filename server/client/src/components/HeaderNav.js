import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu } from 'antd';
import { loginToStore, logOutOfStore } from "../actions"

const { Header } = Layout;

class HeaderNav extends Component {

  render() {
    return (
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
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