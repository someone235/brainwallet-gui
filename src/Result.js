import React, { Component } from 'react';
import TextWithQRCode from './TextWithQRCode';
import Xpub from './Xpub';
import PrivateStuff from './PrivateStuff';
import Address from './Address';
import bitcoinLogo from './img/bitcoin-2546854_640.png';

const brainwallet = window.require('brainwallet');

export default class extends Component {
  render() {
    const addresses = this.props.addresses.map((keypair, i) => {
      return (
        <Address keypair={keypair} i={i} />
      );
      // const addr = brainwallet.toBech32(keypair.getPublicKeyBuffer());
      // return <div key={addr}>
      //   <TextWithQRCode text={addr} qrText={`bitcoin:${addr}`} >
      //     <span style={{ fontSize: 30, fontWeight: 600 }}>{i}</span>. {addr}
      //   </TextWithQRCode>
      // </div>
    });
    return (
      <div>
        <div style={{ width: 300, margin: 'auto' }}>
          <PrivateStuff salt={this.props.salt} mnemonic={this.props.mnemonicDiv} xprv={this.props.xprv} />
          {/* <div>{this.props.mnemonicDiv}</div> */}
          {this.props.xpub && <Xpub xpub={this.props.xpub} />}
        </div>
        <div style={{ width: '100%', margin: 'auto' }}>
          <div style={{ margin: 'auto' }}>{addresses.length ? <div style={{ fontWeight: 600, fontSize: 26, marginBottom: 10 }}><img src={bitcoinLogo} style={{ width: 25 }} /> Addresses:</div> : ''}</div>
          <div style={{ display: 'flex', flexWrap: true }}>
            <div style={{ display: 'inline-block', flex: 1 }}>{addresses.slice(0, 5)}</div>
            <div style={{ display: 'inline-block', flex: 1 }}>{addresses.slice(5, 10)}</div>
          </div>
        </div>
      </div>
    );
  }
}