import React, { findDOMNode } from 'react';

import auth from '../services/authService';

export default React.createClass({
  render() {
    var token = auth.getToken()

    return (
      <h1>About</h1>
    )
  }
})