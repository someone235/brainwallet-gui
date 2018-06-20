import React, { Component } from 'react';
import Header from './Header';
import Description from './Description';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Result from './Result';
import loading from './img/loading.gif';
import bip39 from 'bip39';
const brainwallet = window.require('brainwallet');
const brainseedUtils = window.require('brainseed-utils');
const { HDNode } = require('bitcoinjs-lib');

const DEFAULT_NUMBER_OF_WORDS = 6;

class App extends Component {
  state = {
    addresses: [],
    version: 0,
    numberOfWords: DEFAULT_NUMBER_OF_WORDS,
  };
  generate = async () => {
    let mnemonic = this.state.mnemonic;
    let privKey, bip39Mnemonic;
    console.log('number', this.state.numberOfWords || DEFAULT_NUMBER_OF_WORDS);
    this.setState({ loading: true, addresses: [], mnemonicDiv: null, xpub: null, xprv: null });
    if (mnemonic) {
      bip39Mnemonic = await brainseedUtils.mnemonicToBip39Mnemonic(mnemonic, this.state.salt);
    } else {
      mnemonic = brainseedUtils.generateMnemonic(this.state.version, this.state.numberOfWords || DEFAULT_NUMBER_OF_WORDS);
      bip39Mnemonic = await brainseedUtils.mnemonicToBip39Mnemonic(mnemonic, this.state.salt);
    }
    privKey = await bip39.mnemonicToSeed(bip39Mnemonic);
    this.setState({ loading: false });
    console.log('privKey', privKey.toString('hex'));
    var m = HDNode.fromSeedHex(privKey.toString('hex'));
    // console.log(privKey.toString('hex'));
    console.log('xprv', m.toBase58());
    console.log('xpub', m.neutered().toBase58());
    const xpub = 'z' + m.neutered().toBase58().slice(1);
    const xprv = 'z' + m.toBase58().slice(1);
    console.log('mnemonic', mnemonic);
    const child = m.derivePath("m/84'/0'/0'/0");
    const addresses = Array(10).fill('').map((_, i) => child.derive(i).keyPair/*.getPublicKeyBuffer()*/)/*.map(brainwallet.toBech32)*/;
    // for (let i = 0; i < 10; i++) {
    //   console.log(`address ${i + 1}`, child.derive(i).getAddress());
    // }
    this.setState({ mnemonicDiv: mnemonic, addresses, xpub, xprv, bip39Mnemonic });
  };
  onMnemonicChange = e => {
    const mnemonic = e.target.value;
    try {
      const { entropy, version } = brainwallet.mnemonicToEntropy(mnemonic);
      this.setState({ mnemonic, version: version[0], mnemonicValid: true });
    } catch (e) {
      this.setState({ mnemonic, mnemonicValid: false });
    }
  };
  render() {
    // const addresses = this.state.addresses.map((addr, i) => (
    //   <div key={addr}>
    //     <span style={{ fontSize: 18 }}>{i}</span>. <TextWithQRCode text={addr} qrText={`bitcoin:${addr}`} />
    //   </div>
    // ));
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <div style={{ paddingRight: '10vw', paddingLeft: '10vw', paddingTop: 50, fontColor: '#484848', }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, margin: 10 }}>
                <Description />
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <div style={{ margin: 'auto' }}>
                  <div><TextField floatingLabelText="Salt" hintText="Usually email" value={this.state.salt} onChange={e => this.setState({ salt: e.target.value })} /></div>
                  <div><TextField style={{ width: 100 }} disabled={this.state.mnemonic} floatingLabelText="No. of words" value={this.state.numberOfWords} onChange={e => this.setState({ numberOfWords: Number(e.target.value) })} /></div>
                  <div><TextField floatingLabelText="Mnemonic" multiLine={true} rows={2} value={this.state.mnemonic} onChange={this.onMnemonicChange} /></div>
                  <div>
                    <RadioButtonGroup valueSelected={this.state.version} onChange={e => this.setState({ version: Number(e.target.value) })}>
                      <RadioButton
                        value={0}
                        label="Normal (3 seconds)"
                        style={{
                          marginBottom: 16,
                        }}
                      />
                      <RadioButton
                        value={1}
                        label="Hard (30 seconds)"
                        style={{
                          marginBottom: 16,
                        }}
                        disabled={this.state.mnemonic}
                      />
                      <RadioButton
                        value={2}
                        label="Brutal (1 Hour)"
                        style={{
                          marginBottom: 16,
                        }}
                        disabled={this.state.mnemonic}
                      />
                    </RadioButtonGroup>
                  </div>
                  {/* <div><Slider value={this.state.version} max={2} onChange={e => this.setState({ version: Number(e.target.value) })} step={1} /></div> */}
                  {/* <div><input type="range" value={this.state.version} max={2} onChange={e => this.setState({ version: Number(e.target.value) })} /></div> */}
                  <RaisedButton
                    label={"Generate new seed"}
                    onClick={this.generate}
                    backgroundColor="#14A6B0"
                    style={{ margin: 5 }}
                    disabled={this.state.loading || !(this.state.salt && this.state.numberOfWords)}
                  />
                  <RaisedButton
                    label={"Recover existing seed"}
                    onClick={this.generate}
                    backgroundColor="#14A6B0"
                    style={{ margin: 5 }}
                    disabled={this.state.loading || !(this.state.salt && this.state.mnemonicValid)}
                  />
                  {this.state.loading && <img style={{ width: 50 }} src={loading} />}
                  {/* <div>{this.state.mnemonicDiv}</div>
          {this.state.xpub && <div><TextWithQRCode text={`Xpub:${this.state.xpub}`} qrText={this.state.xpub} /></div>}
          {addresses.length ? <div>Addresses:</div> : ''}
          {addresses} */}
                </div>
              </div>
            </div>
            {this.state.addresses.length ? <hr /> : ''}
            {this.state.addresses.length ? <Result salt={this.state.salt} xprv={this.state.xprv} mnemonicDiv={this.state.mnemonicDiv} bip39Mnemonic={this.state.bip39Mnemonic} xpub={this.state.xpub} addresses={this.state.addresses} /> : ''}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
