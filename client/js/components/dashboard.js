import React, { findDOMNode } from 'react';

import auth from '../services/authService';

export default React.createClass({
  render() {
    var token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
});