import React, { Component } from 'react';
import TextWithQRCode from './TextWithQRCode';

export default class extends Component {
  render() {
    return (
      <div>
        <TextWithQRCode qrText={this.props.xpub}>
          <span style={{ fontSize: 30, fontWeight: 600 }}>ZPUB</span> <textarea rows={1} cols={111} disabled>{this.props.xpub}</textarea>
        </TextWithQRCode>
      </div>
    );
  }
}