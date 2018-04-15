import React, {Component} from 'react';
import {Input, Button} from 'antd';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async() => {
    const response = await this
      .props
      .mutate({variables: this.state})
    const {token, refreshToken} = response.data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  render() {
    return (
      <div>
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
        <Button type="primary" onClick={this.onSubmit}>Login</Button>
      </div>
    )
  }
}

const LOGIN = gql `
  mutation($email : String !, $password : String !) {
    login(email : $email, password : $password) {
      token
      refreshToken
    }
  }
`;

export default graphql(LOGIN)(Login);