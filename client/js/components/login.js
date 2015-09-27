import React from "react";

export default React.createClass({
  render: function() {
    return (
       <form onSubmit={this.handleSubmit}>
        <label><input ref="username" placeholder="username"/></label>
        <label><input ref="pass" placeholder="password" /></label> 
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  },
});