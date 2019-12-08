import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Button, Icon} from 'antd';

const { TextArea } = Input;

class TicketForm extends Component {

  render() {
    return (
      <Form className='ticket-form'>
        <Form.Item style={{ color: 'yellow' }}
          label="Title">
          <Input
            name='title'
            onChange={ this.onChange } />
        </Form.Item>
        <Form.Item>
          <div className="icons-list categories">
            <Icon type="bug" style={{fontSize: '32px', color: 
              '#3399FF'}} theme="outlined" />
            <Icon type="api" style={{fontSize: '32px', color: 
              '#3399FF'}} theme="outlined" />
            <Icon type="laptop" style={{fontSize: '32px', color: 
              '#3399FF'}} theme="outlined" />
            <Icon type="phone" style={{fontSize: '32px', color: 
              '#3399FF'}} theme="outlined" />
            <Icon type="dashboard" style={{fontSize: '32px', color: 
              '#3399FF'}} theme="outlined" />
          </div>
        </Form.Item>
        <Form.Item
          label="Details">
          <TextArea 
            rows={15}
            name='details'
            onChange={ this.onChange } />
        </Form.Item>
      </Form>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   //  tickets: state.tickets
//   state
//   };
// };

export default connect(null)(TicketForm);