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

      // may not need later - allow front end to see their new messages from database
      this.props.fetchChats()
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
    const chats = this.props.chats
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          visible
        >
          <div className="chat-box">
            {chats.map((m, i) => {
              return (
                <div className="col-12" key={i}>
                  <div className="row">
                    <div className="col-2">{m.author}</div>
                    <div className="col">{m.message}</div>
                    <div className="col-3">{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
            <input onKeyPress={this.keyPressed} 
            onChange={this.onChange}
            className="inputMessage" placeholder="Type here..."/>
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