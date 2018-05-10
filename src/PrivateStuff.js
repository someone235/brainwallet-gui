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
        label="Yes"
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
          title="Private stuff"
          actions={actions}
          modal={false}
          open={this.state.openPrivate}
          onRequestClose={this.handleClosePrivate}
        >
          <div><span style={{ fontSize: 30, fontWeight: 600 }}>Mnemonic</span>: {this.props.mnemonic}</div>
          <span style={{ fontSize: 30, fontWeight: 600 }}>ZPRV</span> <textarea rows={2} cols={56} disabled>{this.props.xprv}</textarea>
          <div><QRCode value={this.props.xprv} /></div>
        </Dialog>
        <Dialog
          title="Are you sure?"
          actions={confirmActions}
          modal={false}
          open={this.state.openConfirm}
          onRequestClose={this.handleCancelConfirm}
        >
        </Dialog>
        <div>
          <img onClick={this.handleOpenConfirm} src={QRIcon} style={{ display: 'inline-block', marginLeft: 10, marginRight: 10, cursor: 'pointer' }} />
          Click here to see mnemonic and zprv
        </div>
      </div>
    );
  }
}