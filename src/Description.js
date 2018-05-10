import React, { Component } from 'react';
import realWorldImg from './img/graphic@2x.png';

export default class extends Component {
  render() {
    return (
      <div style={{ width: 324 }}>
        <div style={{ fontWeight: 600, fontSize: 30, marginBottom: 50 }}>What it's about</div>
        <div style={{ marginBottom: 50, fontSize: 16 }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor</div>
        <img src={realWorldImg} />
      </div>
    );
  }
}