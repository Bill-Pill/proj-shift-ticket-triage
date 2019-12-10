import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Input, Icon, Radio, Button} from 'antd';
import { submitDemoTicket } from '../actions'

const { TextArea } = Input;

class TicketForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: 'Bug',
      department: 'Testing',
      ticketdetails: ''
    };
  }

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
      this.setState ({ [name]:value })
  }

  onCategoryChange = (e) => {
    const target = e.target;
    if (target.checked) {
      const value = target.value
      this.setState({ category: value})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.title == '' || this.state.ticketdetails == '') {
      alert('Please type some text in the fields to continue')
    } else {
      const demoUser = this.props.auth.username
      submitDemoTicket(this.state, demoUser, () =>{
          this.props.history.push('/tickets')
      })
    }
  }
  render() {
    console.log('default state: ', this.state)
    return (
      <Form className='ticket-form' onSubmit={this.handleSubmit}>
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
              <Radio.Button value="Bug" onChange={this.onCategoryChange}><Icon type="bug"/>Bug</Radio.Button>
              <Radio.Button value="Network" onChange={this.onCategoryChange}><Icon type="api"/>Internet/Network</Radio.Button>
              <Radio.Button value="Computer" onChange={this.onCategoryChange}><Icon type="laptop"/>Computer</Radio.Button>
              <Radio.Button value="Phone" onChange={this.onCategoryChange}><Icon type="phone"/>Phone</Radio.Button>
              <Radio.Button value="Software" onChange={this.onCategoryChange}><Icon type="dashboard"/>Software</Radio.Button>
            </Radio.Group>
          </div>
        </Form.Item>
        <Form.Item
          label="Details">
          <TextArea 
            placeholder="My computer is unplugged but I'm not getting any power for some reason."
            rows={10}
            name='ticketdetails'
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

const mapStateToProps = state => {
  return {
   auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps, { submitDemoTicket })(TicketForm));