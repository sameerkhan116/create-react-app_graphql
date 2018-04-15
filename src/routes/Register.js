import React, {Component} from 'react';
import {Input, Checkbox, Button} from 'antd';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    isAdmin: false
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value || e.target.checked
    })
  }

  onSubmit = async() => {
    const response = await this
      .props
      .mutate({variables: this.state})
    console.log(response);
  }

  render() {
    return (
      <div>
        <Input
          name='username'
          placeholder='User Name'
          type="text"
          value={this.state.username}
          onChange={e => this.onChange(e)}/>
        <Input
          name='email'
          placeholder='Email'
          type="email"
          value={this.state.email}
          onChange={e => this.onChange(e)}/>
        <Input
          name='password'
          placeholder='username'
          type="password"
          value={this.state.password}
          onChange={this.onChange}/>
        <Checkbox name="isAdmin" checked={this.state.isAdmin} onChange={this.onChange}>Admin?</Checkbox>
        <Button type="primary" onClick={this.onSubmit}>Submit</Button>
      </div>
    )
  }
}

const REGISTER_USER = gql `
  mutation($username : String !, $email : String !, $password : String !, $isAdmin : Boolean !) {
    register(username : $username, email : $email, password : $password, isAdmin : $isAdmin) {
      id
    }
  }
`;

export default graphql(REGISTER_USER)(Register);