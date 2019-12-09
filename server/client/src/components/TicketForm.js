import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Icon, Radio, Button} from 'antd';

const { TextArea } = Input;

class TicketForm extends Component {

  render() {
    return (
      <Form className='ticket-form'>
        <h3 style={{ color: 'yellowgreen' }}>Create a Ticket</h3>
        <Form.Item
          label="Title">
          <Input
            name='title'
            placeholder='Why is my computer on fire?'
            onChange={ this.onChange } />
        </Form.Item>
        <Form.Item
          label="Category">
          <div className="icons-list categories">
            <Radio.Group buttonStyle="solid" defaultValue="Bug">
              <Radio.Button value="Bug"><Icon type="bug"/>Bug</Radio.Button>
              <Radio.Button value="Network"><Icon type="api"/>Internet/Network</Radio.Button>
              <Radio.Button value="Computer"><Icon type="laptop"/>Computer</Radio.Button>
              <Radio.Button value="Phone"><Icon type="phone"/>Phone</Radio.Button>
              <Radio.Button value="Software"><Icon type="dashboard"/>Software</Radio.Button>
            </Radio.Group>
          </div>
        </Form.Item>
        <Form.Item
          label="Details">
          <TextArea 
            placeholder="My computer is unplugged but I'm not getting any power for some reason."
            rows={10}
            name='details'
            onChange={ this.onChange } />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
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