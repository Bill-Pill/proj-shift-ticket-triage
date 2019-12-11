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
    this.createSocketRoom()
    
    socket.on('message received', data => {
      let newSocketMessages = this.state.socketMessages;

      newSocketMessages.push(data)
      this.setState({socketMessages: newSocketMessages})
    })

  }

  createSocketRoom = () => {
    if(this.props.ticketDetails[0])  {
      socket.emit('create', this.props.ticketDetails[0].ticketid)
    }
  }

  sendMessage = () => {
    const message = this.state.message
    if (message) {
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
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

  render() {
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
            <input onKeyPress={this.keyPressed} 
            onChange={this.onChange}
            className="inputMessage" placeholder="Type here..."
            style={{width: '100%'}}/>
          </div>
            
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   ticketDetails: state.details,
   auth: state.auth,
   chats: state.chats
  };
};

export default connect(mapStateToProps, { fetchChats })(SocketChatDrawer);