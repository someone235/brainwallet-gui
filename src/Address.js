import React, { Component } from 'react';
import eye from './img/eye_icon_round@2x.png';
import TextWithQRCode from './TextWithQRCode';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import QRCode from 'qrcode.react';


const brainwallet = window.require('brainwallet');


export default class extends Component {
  state = {
    openPrivate: false,
    openConfirm: false,
  };
  handleOpenPrivate = () => {
    this.setState({ openPrivate: true, openConfirm: false });
  };

  handleClosePrivate = () => {
    this.setState({ openPrivate: false });
  };

  handleOpenConfirm = () => {
    this.setState({ openConfirm: true });
  };

  handleCancelConfirm = () => {
    this.setState({ openConfirm: false });
  };
  render() {
    const addr = brainwallet.toBech32(this.props.keypair.getPublicKeyBuffer());
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClosePrivate}
      />
    ];
    const confirmActions = [
      <FlatButton
        label="Show Me, I'm Safe"
        primary={true}
        onClick={this.handleOpenPrivate}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancelConfirm}
      />,
    ];
    const privKey = `p2wpkh:${this.props.keypair.toWIF()}`;
    return (
      <div key={addr} style={{ marginBottom: 10 }}>
        <Dialog
          titleStyle={{ textAlign: "center" }}
          title="Private Key"
          actions={actions}
          modal={false}
          open={this.state.openPrivate}
          onRequestClose={this.handleClosePrivate}
        >
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: 10 }}><textarea rows={1} cols={60} disabled key={privKey}>{privKey}</textarea></div>
            <div><QRCode value={privKey} /></div>
          </div>
        </Dialog>
        <Dialog
          title="You're about to reveal your address' private key"
          actions={confirmActions}
          modal={false}
          open={this.state.openConfirm}
          onRequestClose={this.handleCancelConfirm}
        >
          Whoever gets this key will have full control over any funds you'll hold in this address.<br />
          please triple check your device is trusted, you have no one behind you and no cameras are pointed at your screen or or even at your glasses.
        </Dialog>
        <span style={{ fontSize: 30, fontWeight: 600 }}>{this.props.i}</span>.
        <TextWithQRCode text={addr} qrText={`bitcoin:${addr}`} >
          <span style={{ fontSize: 18, display: 'inline-block', wordWrap: 'break-word', width: '21vw', minWidth: 250 }}>{addr}</span>
        </TextWithQRCode>
        <div style={{ marginLeft: 65 }}>Show private key: <img src={eye} style={{ width: 20, cursor: 'pointer' }} onClick={this.handleOpenConfirm} /></div>
      </div>
    );
  }
}