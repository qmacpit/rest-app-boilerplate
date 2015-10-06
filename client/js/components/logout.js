import React, { findDOMNode } from 'react';
import { History } from 'react-router';

import auth from '../services/authService';

export default React.createClass({
  mixins: [ History ],
  componentWillMount() {
    auth.logout();
  },  
  render() {
    return (
      <div />
    )
  }
})