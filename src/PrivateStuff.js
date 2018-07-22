import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import QRIcon from './img/QR_icon.png';


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
    return (
      <div style={{ display: 'inline-block' }}>
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={this.state.openPrivate}
          onRequestClose={this.handleClosePrivate}
        >
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 10 }}>Brain Seed</div>
            <div style={{ marginBottom: 50, fontSize: 18, wordSpacing: 20 }}>{this.props.mnemonic}</div>
            <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 10 }}>BIP39 Compatible Seed</div>
            <div style={{ marginBottom: 50, fontSize: 18, wordSpacing: 20 }}>{this.props.bip39Mnemonic}</div>
            <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 10 }}>Salt</div>
            <div style={{ marginBottom: 50, fontSize: 18 }}>{this.props.salt}</div>
            {/* <div ><span style={{ fontSize: 30, fontWeight: 600 }}>Mnemonic</span>: {this.props.mnemonic}</div> */}
            <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 10 }}>Extended Private Key</div>
            <div style={{ marginBottom: 10 }}><textarea rows={2} cols={56} disabled key={this.props.xprv}>{this.props.xprv}</textarea></div>
            <div><QRCode value={this.props.xprv} /></div>
          </div>
        </Dialog>
        <Dialog
          titleStyle={{ textAlign: "center" }}
          title="You're about to reveal your Brain Seed"
          actions={confirmActions}
          modal={false}
          open={this.state.openConfirm}
          onRequestClose={this.handleCancelConfirm}
        >
          Whoever gets these few words have full control over any funds you'll hold in your brain wallet.<br />
          please triple check your device is trusted, you have no one behind you and no cameras are pointed at your screen or or even at your glasses.
        </Dialog>
        <div>
          <RaisedButton
            label={"Show me my brain seed"}
            onClick={this.handleOpenConfirm}
            backgroundColor="#14A6B0"
            style={{ margin: 10 }}
          />
        </div>
      </div>
    );
  }
}