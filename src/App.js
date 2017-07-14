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
    this.updateSelectedAllStatus = this.updateSelectedAllStatus.bind(this);
    this.updateStarredStatus = this.updateStarredStatus.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.addLabels = this.addLabels.bind(this);
    this.removeLabels = this.removeLabels.bind(this);
  }

  getSelectedMessages() {
    return this.state.messages.filter(msg => msg.selected);
  }

  updateSelectedAllStatus(status) {
    let messages = this.state.messages.map(msg => msg.selected = status);
    
    this.setState(messages);
  }

  updateSelectedStatus(messageId, status) {
    let message = this.state.messages.find(m => m.id === messageId);
    message.selected = status;

    this.setState({message});
  }

  updateStarredStatus(messageId, status) {
    let message = this.state.messages.find(m => m.id === messageId);
    message.starred = status;

    this.setState(this.state.messages);
  }

  updateReadStatus(status) {
    let messages = this.getSelectedMessages()
                       .map((msg) => msg.read = status);

    this.setState(messages);
  }

  addLabels(label) {

      let messages = this.getSelectedMessages();

      for (let i = 0; i < messages.length; i++) {
        if (!messages[i].labels.includes(label)) {
          messages[i].labels.push(label);
        }
      }

      this.setState(messages);
  }

  removeLabels(label) {

    let messages = this.getSelectedMessages();

    for (let i = 0; i < messages.length; i++) {
      for (let j = 0; j < messages[i].labels.length; j++) {
        if (messages[i].labels[j] === label) {
          messages[i].labels.splice(j, 1);
        }
      }
    }

    this.setState(messages);
  }

  deleteMessages() {
    let messages = this.state.messages.slice();
    let selectedMessages = this.getSelectedMessages();

    for (let i = 0; i < messages.length; i++) {
      for (let j = 0; j < selectedMessages.length; j++) {
        if (messages[i].id === selectedMessages[j].id) {
          messages.splice(i, 1);
        }
      }
    }

    this.setState({messages});
  }

  // example code;
  toggleProperty(message, property) {
    this.setState((prevState) => {
      const index = prevState.messages.indexOf(message)
      return {
        messages: [
          ...prevState.messages.slice(0, index),
          { ...message, [property]: !message[property] },
          ...prevState.messages.slice(index + 1),
        ]
      };
    })
  }

  render() {
      return (
         <div className="container">
          <Toolbar messages={this.state.messages}
            updateSelectedAllStatus={this.updateSelectedAllStatus}
            updateReadStatus={this.updateReadStatus}
            deleteMessages={this.deleteMessages}
            addLabels={this.addLabels}
            removeLabels={this.removeLabels}
          />
          <Messages
            messages={this.state.messages}
            updateSelectedStatus={this.updateSelectedStatus}
            updateStarredStatus={this.updateStarredStatus}
          />
         </div>
      );
  }
}

export default App;
