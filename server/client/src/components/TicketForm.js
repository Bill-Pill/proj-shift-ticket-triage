import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Icon, Radio} from 'antd';

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
        <Form.Item style={{ color: 'yellow' }}
          label="Category">
          <div className="icons-list categories">
            <Radio.Group buttonStyle="solid" defaultValue="bug">
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