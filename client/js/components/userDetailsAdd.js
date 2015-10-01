import React from 'react';

import userService from '../services/userService';
import template from '../template';

export default React.createClass({
  
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.user)
    userService.createUser(this.state.user);
  },

  onUserFormChange(key) {
    return function(event) {
      var user = this.state.user;
      user[key] = event.target.value;
      this.setState({
        user: user
      })
    }.bind(this);    
  },

  getInitialState() {
    return {
      user: {}
    };
  },

  render() {          
    return (
      <div>
        <h3>add new user</h3>  
        <form onSubmit={this.handleSubmit}>
          <label>
            username
            <input type="text" value={this.state.user.username} onChange={this.onUserFormChange("username")}/>
          </label>
          <label>
            role
            <input type="text" value={this.state.user.role} onChange={this.onUserFormChange("role")}/>            
          </label>          
          <label>
            password
            <input type="text" value={this.state.user.password} onChange={this.onUserFormChange("password")}/> 
          </label>
           <br/>
          <button type="submit">Add</button> 
        </form>              
      </div>
    )
  }
});