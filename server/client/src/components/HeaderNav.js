import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon } from 'antd';
import Media from 'react-media'
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
  display: 'inline-block',
  float: 'left'
}

class HeaderNav extends Component {

  render() {
    return (
      <Header>
        <div className="logo" style={logoStyle}>WIP
          <Icon type="plus-square" theme="filled" 
            style={{display:'inline', fontSize: '30px'}}/>TRIAGE</div>
        {/* <Media queries={{
          xs: "(max-width: 575px)",
          s: "(min-width: 576px) and (max-width: 767px)",
          m: "(min-width: 768px) and (max-width: 991px)",
          l: "(min-width: 992px) and (max-width: 1199px)",
          large: "(min-width: 1200px)"
        }}>

        </Media> */}
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
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">Nav 2</Menu.Item>

                  </Menu>
                  
            ) : (
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    breakpoint={'xs'}
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'right', marginRight: '250px' }}
                  >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">Nav 2</Menu.Item>

                  </Menu>
            )
          }
        </Media>
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