import React, { Component } from 'react';
import TextWithQRCode from './TextWithQRCode';
import Xpub from './Xpub';
import PrivateStuff from './PrivateStuff';

export default class extends Component {
  render() {
    const addresses = this.props.addresses.map((addr, i) => (
      <div key={addr}>
        <TextWithQRCode text={addr} qrText={`bitcoin:${addr}`} >
          <span style={{ fontSize: 30, fontWeight: 600 }}>{i}</span>. {addr}
        </TextWithQRCode>
      </div>
    ));
    return (
      <div>
        <PrivateStuff mnemonic={this.props.mnemonicDiv} xprv={this.props.xprv} />
        {/* <div>{this.props.mnemonicDiv}</div> */}
        {this.props.xpub && <Xpub xpub={this.props.xpub} />}
        {addresses.length ? <div>Addresses:</div> : ''}
        {addresses}
      </div>
    );
  }
}