import React, { Component } from 'react';
import TextWithQRCode from './TextWithQRCode';

export default class extends Component {
  render() {
    return (
      <div>
        <TextWithQRCode qrText={this.props.xpub}>
          <span style={{ fontSize: 20, fontWeight: 600 }}>View Extended Public Key</span>
        </TextWithQRCode>
      </div>
    );
  }
}