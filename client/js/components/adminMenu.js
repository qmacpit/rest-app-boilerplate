import React from 'react'
import { Link } from 'react-router'


export default React.createClass({

  selected: function(a) {
    // console.log(a)
  },

  render() {
    return (
      <div>
        <h3>AdminMenu</h3>
        <Link to="/admin" onClick={this.selected}>dashoard</Link>
        <Link to="/admin/users" onClick={this.selected}>users</Link>
        <Link to="/logout">logout</Link>      
      </div>
    );
  }
});