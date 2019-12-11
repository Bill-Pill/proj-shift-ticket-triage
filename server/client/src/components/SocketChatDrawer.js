import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchChats } from '../actions'
import io from 'socket.io-client'
const socket = io()

class SocketChatDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      socketMessages: []
    };
  }

  componentDidMount () {
    this.props.fetchChats()

    socket.on('message received', data => {
      let newSocketMessages = this.state.socketMessages;

      newSocketMessages.push(data)
      this.setState({socketMessages: newSocketMessages})
    })
  }

  onChange = (e) => {
    let value = e.target.value
    this.setState({message: value})
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage()
      e.target.value = ''
      // may not need later - allow front end to see their new messages from database
      // this.props.fetchChats()
    }
  }

    sendMessage = () => {
      const message = this.state.message
      if (message) {
        // tell server to execute 'new message' and send along one parameter
        socket.emit('new message', message);
      }
   }

  render() {
    console.log('chat drawer render props: ', this.props)
    console.log('state drawer: ', this.state)
    const chats = this.props.chats
    return (
      <div className="chat-box">
          <div className="chat-messages">
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
            {this.state.socketMessages.map((m, i) => {
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