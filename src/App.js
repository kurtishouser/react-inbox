import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import Messages from './Messages.js';

class App extends Component {

  constructor() {
    super();

    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        }, {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        }, {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        }, {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        }, {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        }, {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        }, {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        }, {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
      // messages: []
    }

    this.updateSelectedStatus = this.updateSelectedStatus.bind(this);
    this.updateStarredStatus = this.updateStarredStatus.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
  }

  updateSelectedStatus(id, status) {
    let message = this.state.messages.find(m => m.id === id);
    message.selected = status;
    this.setState(this.state.messages);
  }

  updateStarredStatus(id, status) {
    let message = this.state.messages.find(m => m.id === id);
    message.starred = status;
    this.setState(this.state.messages);
  }

  updateReadStatus(messageIds, status) {
    for (let i = 0; i < this.state.messages.length; i++) {
      for (let j = 0; j < messageIds.length; j++) {
        if (this.state.messages[i].id === messageIds[j]) {
          let message = this.state.messages[i];
          message.read = status;
        }
      }
    }
    this.setState(this.state.messages);
  }

  deleteMessages(messageIds) {
    for (let i = 0; i < this.state.messages.length; i++) {
      for (let j = 0; j < messageIds.length; j++) {
        if (this.state.messages[i].id === messageIds[j]) {
          this.state.messages.splice(i, 1);
        }
      }
    }
    this.setState(this.state.messages);
  }

  render() {
      return (
         <div className="container">
          <Toolbar messages={this.state.messages}
            updateReadStatus={this.updateReadStatus}
            deleteMessages={this.deleteMessages}
          />
          <Messages
            messages={this.state.messages}
            updateStarredStatus={this.updateStarredStatus}
            updateSelectedStatus={this.updateSelectedStatus}
          />
         </div>
      );
  }
}

export default App;
