import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import Messages from './Messages.js';

const BASE_PATH = "http://localhost:8181/api/messages"

class App extends Component {

  constructor() {
    super();

    this.state = {messages: []}

    this.updateSelectedAllStatus = this.updateSelectedAllStatus.bind(this);
    this.updateStarredStatus = this.updateStarredStatus.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.addLabels = this.addLabels.bind(this);
    this.removeLabels = this.removeLabels.bind(this);
    this.toggleProperty = this.toggleProperty.bind(this);

    this.fetchMessages = this.fetchMessages.bind(this);

  }

  fetchMessages() {
    fetch(BASE_PATH)
      .then(response => {
        console.log(response.status, 'Mesages loaded from server');
        return response.json();
      })
      .then(result => {
        let messages = result._embedded.messages;
        // console.log(messages);
        this.setState({messages});
      });
  }

  getSelectedMessages() {
    return this.state.messages.filter(msg => msg.selected);
  }

  updateSelectedAllStatus(status) {

    this.setState((prevState) => {

      let messages = prevState.messages.map((msg) => ({...msg, selected: status}));

      return {messages};
    })
  }

  updateReadStatus(status) {
    let selectedMessageIds = this.getSelectedMessages().map(msg => msg.id);

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": selectedMessageIds,
        "command": "read",
        "read": status,
      }),
    }

    fetch(BASE_PATH, options)
      .then((response) => {
        if (response.status === 200) {

          let messages = this.state.messages.map(msg => {
            if (msg.selected) {
              return {...msg, read: status};
            } else {
              return msg;
            }
          });

          this.setState({messages});
        }
      });
  }

  updateStarredStatus(message, command) {
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [message.id],
        "command": command,
        [command]: !message.starred,
      }),
    }

    fetch(BASE_PATH, options)
      .then((response) => {
        if (response.status === 200) {
          this.toggleProperty(message, 'starred');
        }
      });
  }

  addLabels(label) {

    let messageIds = this.getSelectedMessages()
                         .filter((msg) => !msg.labels.includes(label))
                         .map((msg) => msg.id);

    if (messageIds.length !== 0) {
      let options = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          'messageIds': messageIds,
          'command': 'addLabel',
          'label': label,
        }),
      };

      fetch(BASE_PATH, options)
        .then((response) => {
          if (response.status === 200) {

            let messages = this.state.messages.map((msg) => {
              if (messageIds.includes(msg.id)) {
                  let labels = msg.labels.slice();
                  labels.push(label);
                  return {...msg, labels: labels}
              } else {
                return msg;
              }
            });

            this.setState({messages});
          }
        });
    }


  }

  removeLabels(label) {

    let messageIds = this.getSelectedMessages()
                         .filter((msg) => msg.labels.includes(label))
                         .map((msg) => msg.id);

    if (messageIds.length !== 0) {
      let options = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          'messageIds': messageIds,
          'command': 'removeLabel',
          'label': label,
        }),
      };

      fetch(BASE_PATH, options)
        .then((response) => {
          if (response.status === 200) {

            let messages = this.state.messages.map((msg) => {
              if (messageIds.includes(msg.id)) {
                  let labels = msg.labels.slice();
                  labels.splice(msg.labels.indexOf(label), 1);
                  return {...msg, labels: labels}
              } else {
                return msg;
              }
            });

            this.setState({messages});
          }
        });
    }
  }

  deleteMessages() {
    let selectedMessageIds = this.getSelectedMessages().map(msg => msg.id);

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': selectedMessageIds,
        'command': 'delete',
      }),
    }

    fetch(BASE_PATH, options)
      .then((response) => {
        if (response.status === 200) {

          let messages = this.state.messages.filter((msg) => !msg.selected);

          this.setState({messages});
        }
      });
  }

  toggleProperty(message, property) {

    this.setState((prevState) => {

      const index = prevState.messages.indexOf(message);

      return {
        messages: [
          ...prevState.messages.slice(0, index),
          { ...message, [property]: !message[property] },
          ...prevState.messages.slice(index + 1),
        ]
      };
    })
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
      return (
         <div className="container">
          <Toolbar
            messages={this.state.messages}
            updateSelectedAllStatus={this.updateSelectedAllStatus}
            updateReadStatus={this.updateReadStatus}
            deleteMessages={this.deleteMessages}
            addLabels={this.addLabels}
            removeLabels={this.removeLabels}
          />
          <Messages
            messages={this.state.messages}
            updateStarredStatus={this.updateStarredStatus}
            toggleProperty={this.toggleProperty}
          />
         </div>
      );
  }
}

export default App;
