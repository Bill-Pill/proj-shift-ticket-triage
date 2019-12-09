import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTicketDetails } from "../actions"
import { Row, Col, Layout, Breadcrumb, Input } from 'antd'
import StatusTimeline from './StatusTimeline'
import TicketProgress from './TicketProgress'
import SiderRight from './SiderRight'
import io from 'socket.io-client'

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const socketUrl = 'http://10.174.69.249:5000'

class TicketDetails extends Component {
  state = {
    collapsed: false,
    socket: null,
    user: null,
    nickname:'',
    error:''
  };

  componentDidMount() {
    const ticketid = this.props.match.params.ticketid
    this.props.fetchTicketDetails(ticketid)
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log('Sockets online')
    })
    this.setState({socket})
  }

  setUser = (user) => {
    const { socket } = this.state
    socket.emit("USER_CONNECTED", user)
    this.setState({user})
  }

  setFormUser = ({user, isUser}) => {
    console.log(user, isUser)
    if(isUser) {
      this.setState(this.state.error, 'name is taken')
    } else {
      this.setUser(user)
    }
  }

  logout = () => {
    const { socket } = this.state
    socket.emit('LOGOUT')
    this.setState({user:null})
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleSubmit = (e) => {
    e.preventDefault()

    const{ socket } = this.state
    const { nickname } = this.state
    socket.emit('VERIFY_USER', nickname, this.setFormUser)
  }

  handleChange = (e) => {
    this.setState({nickname:e.target.value})
  }
  

  renderTicketDetails() {
    if (this.props.ticketDetails[0]) {
      const ticketDetails = this.props.ticketDetails[0]
      return (
        <div className='details'>
          <div>HI HELP IM STUCK IN DETAILS</div>
          <div>{ticketDetails.title}</div>
          <div>{ticketDetails.category}</div>
          <div>{ticketDetails.ticketdetails}</div>
          <div>{ticketDetails.department}</div>
        </div>
      )
    }
    
  }

  render() {
    const { nickname, error } = this.state
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
              {this.renderTicketDetails()}
              <div className="container-status">
                <Row type="flex" align="middle" className="row-status">
                  <Col span={4}>
                    <h3>Status Feed</h3>
                    <StatusTimeline />
                  </Col>
                  <Col span={20}>
                    <TicketProgress />
                  </Col>
                </Row>
                <div className="testing-login">
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      <h2>Whats nickname</h2>
                    </label>
                    <input ref={(input) => {this.textInput = input}}
                      type="text"
                      id="nickname"
                      value={nickname}
                      onChange={this.handleChange}
                      placeholder={'neat username'}
                      />
                      <div className="error">{error ? error:null}</div>

                  </form>
                  
                </div>
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

const mapStateToProps = state => {
  return {
   ticketDetails: state.details
  };
};

export default connect(mapStateToProps, {fetchTicketDetails})(TicketDetails);