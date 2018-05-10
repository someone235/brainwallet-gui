import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import QRIcon from './img/QR_icon.png';


export default class extends Component {
  state = {};
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div style={{ display: 'inline-block' }}>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <QRCode value={this.props.qrText || this.props.text} />
        </Dialog>
        <div>
          <img onClick={this.handleOpen} src={QRIcon} style={{ display: 'inline-block', marginLeft: 10, marginRight: 10, cursor: 'pointer' }} />
          {this.props.children || this.props.text}
        </div>
      </div>
    );
  }
}