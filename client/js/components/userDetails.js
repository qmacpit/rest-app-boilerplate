import React from 'react';

import userService from '../services/userService';

export default React.createClass({
  componentDidMount() {
    if (this.isWorkingMode(["edit", "display"]))
      this.fetchUserData(this.props.params.id);    
  },

  componentDidUpdate(prevProps) {    
    if (this.isWorkingMode(["edit", "display"]) 
        && prevProps.params.id !== this.props.params.id)
      this.fetchUserData(this.props.params.id);
  },

  fetchUserData(id) {
    userService.getUserData(id)
    .then(function(userData){
      this.setState({
        user: userData
      })
    }.bind(this));
  },

  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.user)
    userService.saveUser(this.state.user);
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

  getWorkingMode() {
    return this.props.location.query.mode;
  },

  isWorkingMode(isWorkingMode) {
    if (Array.isArray(isWorkingMode))
      return isWorkingMode.indexOf(this.getWorkingMode()) !== -1
    return this.getWorkingMode() === isWorkingMode;
  },

  getInitialState() {
    return {
      user: {}
    };
  },

  render() {      
    var isDisplay = this.isWorkingMode("display");
    return (
      <div>
        <h1>user details</h1>  
        <form onSubmit={this.handleSubmit}>
          <label>
            username
            <input type="text" value={this.state.user.username} onChange={this.onUserFormChange("username")}
              disabled={this.isWorkingMode(["edit", "display"]) ? "disabled" : false}/>
          </label>
          <label>
            role
            <input type="text" value={this.state.user.role} onChange={this.onUserFormChange("role")}
              disabled={isDisplay ? "disabled" : false}/>
            <br />
          </label>
          <button type="submit">{ isDisplay ? "ok" : "save"}</button>        
        </form>              
      </div>
    )
  }
});