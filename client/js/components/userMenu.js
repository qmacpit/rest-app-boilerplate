import React from 'react'
import { Link } from 'react-router'


export default React.createClass({

  setUpLink(component) {
    if (this.props.routeParams 
      && this.props.routeParams.id) 
      return "/admin/users/" + this.props.routeParams.id + component;
    return component;
  },

  selected: function(a) {
    // console.log(a)    
  },

  render() {
    return (
      <div>
        <h3>UserMenu</h3> 
        {(() => {
          if (this.props.routeParams && this.props.routeParams.id)
            return <Link to="/admin">back</Link>
        })()}
        <Link to={this.setUpLink("/categories")} onClick={this.selected}>categories</Link>
        <Link to={this.setUpLink("/items")} onClick={this.selected}>items</Link>
        <Link to="/logout">logout</Link>      
      </div>
    );
  }
});