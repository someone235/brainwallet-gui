import React, { Component } from 'react';
import TextWithQRCode from './TextWithQRCode';
import Xpub from './Xpub';
import PrivateStuff from './PrivateStuff';
import Address from './Address';
import bitcoinLogo from './img/bitcoin-2546854_640.png';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { DERIVATIONS } from './constants';
const { HDNode, networks } = require('bitcoinjs-lib');


const brainwallet = window.require('brainwallet');

export default class extends Component {
  state = {
    derivation: DERIVATIONS.BIP84,
  };
  getNetwork() {
    switch (this.state.derivation) {
      case DERIVATIONS.BIP84:
        return {
          baseNetwork: "bitcoin",
          messagePrefix: '\x18Bitcoin Signed Message:\n',
          bech32: 'bc',
          bip32: {
            public: 0x04b24746,
            private: 0x04b2430c
          },
          pubKeyHash: 0x00,
          scriptHash: 0x05,
          wif: 0x80
        };
      case DERIVATIONS.BIP49:
        return {
          baseNetwork: "bitcoin",
          messagePrefix: '\x18Bitcoin Signed Message:\n',
          bech32: 'bc',
          bip32: {
            public: 0x049d7cb2,
            private: 0x049d7878
          },
          pubKeyHash: 0x00,
          scriptHash: 0x05,
          wif: 0x80
        };
      default:
        networks.bitcoin;
    }
  }
  getHdKey = () => {
    const { hdPrivKey } = this.props;
    return HDNode.fromSeedHex(hdPrivKey.toString('hex'), this.getNetwork());
  }
  render() {
    const hdKey = this.getHdKey();
    const derivation = this.state.derivation;
    const path = `m/${derivation}'/0'/0'/`;
    const accountExtendedKey = calcBip32ExtendedKey(path, hdKey);
    // const root = hdKey.derivePath(path);
    // const rootHD = HDNode.fromSeedHex(root.keyPair.d.toString(16));
    const child = accountExtendedKey.derive(0);
    const xpub = getExtendedPublicKey({ hdKey: accountExtendedKey, derivation });
    const xprv = getExtendedPrivateKey({ hdKey: accountExtendedKey, derivation });
    const addresses = Array(10).fill('').map((_, i) => child.derive(i).keyPair);
    const addressesComps = addresses.map((keypair, i) => {
      return (
        <Address keypair={keypair} derivation={derivation} i={i} />
      );
    });
    return (
      <div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Derivation</div>
          <RadioButtonGroup valueSelected={derivation} onChange={e => this.setState({ derivation: Number(e.target.value) })}>
            <RadioButton
              value={DERIVATIONS.BIP44}
              label="Legacy BIP44"
              style={{
                marginBottom: 16,
              }}
            />
            <RadioButton
              value={DERIVATIONS.BIP49}
              label="p2sh-segwit BIP49"
              style={{
                marginBottom: 16,
              }}
            />
            <RadioButton
              value={DERIVATIONS.BIP84}
              label="Native Segwit BIP84"
              style={{
                marginBottom: 16,
              }}
            />
          </RadioButtonGroup>
        </div>
        <div style={{ width: 300, margin: 'auto' }}>
          <PrivateStuff salt={this.props.salt} mnemonic={this.props.mnemonicDiv} xprv={xprv} bip39Mnemonic={this.props.bip39Mnemonic} />
          {/* <div>{this.props.mnemonicDiv}</div> */}
          {xpub && <Xpub xpub={xpub} />}
        </div>
        <div style={{ width: '100%', margin: 'auto' }}>
          <div style={{ margin: 'auto' }}>{addressesComps.length ? <div style={{ fontWeight: 600, fontSize: 26, marginBottom: 10 }}><img src={bitcoinLogo} style={{ width: 25 }} /> Addresses:</div> : ''}</div>
          <div style={{ display: 'flex', flexWrap: true }}>
            <div style={{ display: 'inline-block', flex: 1 }}>{addressesComps.slice(0, 5)}</div>
            <div style={{ display: 'inline-block', flex: 1 }}>{addressesComps.slice(5, 10)}</div>
          </div>
        </div>
      </div>
    );
  }
}

function getExtendedPrivateKey({ hdKey, derivation }) {
  return getExtendedKeyPrefix(derivation) + hdKey.toBase58().slice(1);
}

function getExtendedPublicKey({ hdKey, derivation }) {
  return getExtendedKeyPrefix(derivation) + hdKey.neutered().toBase58().slice(1);
}

function getExtendedKeyPrefix(derivation) {
  if (derivation === DERIVATIONS.BIP84) {
    return 'z';
  }
  if (derivation === DERIVATIONS.BIP49) {
    return 'y';
  }
  return 'x';
}

function calcBip32ExtendedKey(path, bip32RootKey) {
  // Check there's a root key to derive from
  if (!bip32RootKey) {
    return bip32RootKey;
  }
  var extendedKey = bip32RootKey;
  // Derive the key from the path
  var pathBits = path.split("/");
  for (var i = 0; i < pathBits.length; i++) {
    var bit = pathBits[i];
    var index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }
    var hardened = bit[bit.length - 1] == "'";
    var isPriv = !(extendedKey.isNeutered());
    var invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
      extendedKey = null;
    }
    else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index);
    }
    else {
      extendedKey = extendedKey.derive(index);
    }
  }
  return extendedKey
}