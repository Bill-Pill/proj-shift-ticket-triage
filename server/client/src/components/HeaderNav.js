import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Modal, Button } from 'antd';
import Media from 'react-media'
import { loginToStore, logOutOfStore, loginAsDemo } from "../actions"

const { Header } = Layout;

const logoStyle = {
  fontFamily: 'Raleway',
  fontSize: '30px',
  color: '#df1f1f',
  width: '300px',
  height: '44px',
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
        <div className="logo" style={logoStyle}>
          <span style={{color: 'white'}}>TICKET</span>
          <Icon type="medicine-box" theme="twoTone"
            twoToneColor="#df1f1f"
            style={{display:'inline', fontSize: '30px', letterSpacing: '50px'}}/>TRIAGE</div>

        <Media query={{ maxWidth: 768 }}>
          {matches =>
            matches ? (
              
              <Menu
                    theme="dark"
                    mode="horizontal"
                    breakpoint={'xs'}
                    selectedKeys={['/tickets']}
                    style={{ lineHeight: '64px', float: 'left' }}
                  >
                   <Menu.Item key="/tickets">
                     <Link to='/tickets'>Tickets</Link>
                    </Menu.Item>

                  </Menu>
                  
            ) : (
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    breakpoint={'xs'}
                    selectedKeys={['/tickets']}
                    style={{ lineHeight: '64px', float: 'right', marginRight: '250px' }}
                  >
                    <Menu.Item key="/tickets">
                      <Link to='/tickets'>Tickets</Link>
                    </Menu.Item>

                  </Menu>
            )
          }
        </Media>
        <Modal
          visible={this.state.visible}
          title="Welcome to Demo Night!"
          footer={[
            <Button key="demologin" type="primary" 
              onClick={this.handleDemoLoginClick}>
              Demo!
            </Button>
          ]}
        >
          <p>Please create a ticket using the sidebar form.</p>
          <p>Once created, click the ticket on the list to watch the process realtime.</p>
          <p>Be ready - you'll be asked by The IT bot for a response!</p>
          <p>That's it - enjoy the evening and please do stop by my booth. - Billy</p>
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