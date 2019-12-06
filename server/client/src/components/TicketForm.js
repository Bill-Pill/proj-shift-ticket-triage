import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Form, Input} from 'antd';

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