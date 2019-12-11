import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchChats } from '../actions'
import { Drawer, Button, Radio } from 'antd';
import io from 'socket.io-client'
const socket = io()

class SocketChatDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentDidMount () {
    this.props.fetchChats()
  }

  onChange = (e) => {
    let value = e.target.value
    this.setState({message: value})
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage()
    }
  }

    sendMessage = () => {
      const message = this.state.message
      // if there is a non-empty message and a socket connection
      if (message) {

        // shows visible message
        // addChatMessage({
        //   username: 'socketTester',
        //   message: message
        // });

        // tell server to execute 'new message' and send along one parameter
        socket.emit('new message', message);
      }
   }

  render() {
    console.log('chat drawer render props: ', this.props)
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          visible
        >
          <ul className="pages">
          <li className="chat page">
            <div className="chatArea">
              <ul className="messages"></ul>
            </div>
            <input onKeyPress={this.keyPressed} 
            onChange={this.onChange}
            className="inputMessage" placeholder="Type here..."/>
          </li>
        </ul>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   auth: state.auth,
   chats: state.chats
  };
};

export default connect(mapStateToProps, { fetchChats })(SocketChatDrawer);