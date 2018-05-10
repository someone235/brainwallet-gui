import React, { Component } from 'react';
import logo from './img/logo_white@2x.png';

export default class extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: 93, backgroundColor: '#043E42', paddingRight: 200, paddingLeft: 200, paddingTop: 50, paddingBottom: 50 }}>
        <img src={logo} style={{ marginRight: 50 }} />
        <div style={{ fontSize: 35, color: 'white', fontFamily: 'Roboto, Regular', marginBottom: 20, display: 'inline-block' }}>Secure and simple memory wallet</div>
      </div>
    );
  }
}