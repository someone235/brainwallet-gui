import React, { Component } from 'react';
import realWorldImg from './img/graphic@2x.png';

export default class extends Component {
  render() {
    return (
      <div style={{ width: 324 }}>
        <div style={{ fontWeight: 600, fontSize: 30, marginBottom: 50 }}>What it's about</div>
        <div style={{ marginBottom: 50, fontSize: 16 }}>
          Brain Seed is a standard for keeping your wallet in your head. You need to remember a Salt, which is not secret (Could be your email) and a small number of randomly generated, easy to remember words.<br /><br />
          Extracting your keys from this seed takes much longer then normal Bitcoin Seeds, that's what is traded off to allow for your passphrase to be shorter and easy to remember.
To effectively remember your Brain Seed, <a href="http://www.memorizeeverything.com/core_skills/lists/">learn some very simple memory techniques</a>.
        </div>
        <img src={realWorldImg} />
      </div>
    );
  }
}