import React, { Component } from 'react';
import { connect } from "react-redux";
import { Drawer, Button, Radio } from 'antd';

const RadioGroup = Radio.Group;

class SocketChatDrawer extends Component {

  render() {
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          visible
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default connect(null)(SocketChatDrawer);