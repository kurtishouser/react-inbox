import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
import Compose from './components/Compose.js';
import Messages from './components/Messages.js';

const BASE_PATH = "http://localhost:8181/api/messages"

class App extends Component {

  constructor() {
    super();

    this.state = {
      messages: [],
      displayForm: false,
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.displayComposeForm = this.displayComposeForm.bind(this);
    this.updateSelectedAllStatus = this.updateSelectedAllStatus.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
    this.updateStarredStatus = this.updateStarredStatus.bind(this);
    this.addLabels = this.addLabels.bind(this);
    this.removeLabels = this.removeLabels.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.toggleProperty = this.toggleProperty.bind(this);
  }

  fetchMessages() {
    fetch(BASE_PATH)
      .then(response => {
        return response.json();
      })
      .then(result => {
        let messages = result._embedded.messages;
        this.setState({messages, displayForm: false});
      });
  }

  sendMessage(message) {

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(message),
    }

    fetch(BASE_PATH, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let message = {
          id: result.id,
          subject: result.subject,
          starred: result.starred,
          read: result.read,
          labels: result.labels,
          body: result.body,
          selected: false,
        }

        this.setState((prevState) => {
          return {
            messages: [...prevState.messages, message],
            displayForm: !prevState.displayForm,
          }
        });
      });
  }

  getSelectedMessages() {
    return this.state.messages.filter(msg => msg.selected);
  }

  displayComposeForm() {
    this.setState((prevState) => {
      return {
        messages: [...prevState.messages],
        displayForm: !prevState.displayForm,
      }
    });
  }

  updateSelectedAllStatus(status) {

    this.setState((prevState) => {

      let messages = prevState.messages.map((msg) => ({...msg, selected: status}));

      return {messages, displayForm: prevState.displayForm};
    });
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

          this.setState((prevState) => {
            let messages = prevState.messages.map(msg => {
              if (msg.selected) {
                return {...msg, read: status};
              } else {
                return msg;
              }
            });

            return ({messages, displayForm: prevState.displayForm});
          });
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

            this.setState((prevState) => {
              let messages = prevState.messages.map((msg) => {
                if (messageIds.includes(msg.id)) {
                    let labels = msg.labels.slice();
                    labels.push(label);
                    return {...msg, labels: labels}
                } else {
                  return msg;
                }
              });

              return {messages, displayForm: prevState.displayForm};
            });
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

            this.setState((prevState) => {
              let messages = prevState.messages.map((msg) => {
                if (messageIds.includes(msg.id)) {
                    let labels = msg.labels.slice();
                    labels.splice(msg.labels.indexOf(label), 1);
                    return {...msg, labels: labels}
                } else {
                  return msg;
                }
              });

              return {messages, displayForm: prevState.displayForm};
            });
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

          this.setState((prevState) => {
            let messages = prevState.messages.filter((msg) => !msg.selected);

            return {messages, displayForm: prevState.displayForm};
          });
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
        ],
        displayForm: prevState.displayForm,
      };
    })
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    const {messages, displayForm} = this.state;
    return (
      <div className="container">
        <Toolbar
          messages={messages}
          displayComposeForm={this.displayComposeForm}
          updateSelectedAllStatus={this.updateSelectedAllStatus}
          updateReadStatus={this.updateReadStatus}
          deleteMessages={this.deleteMessages}
          addLabels={this.addLabels}
          removeLabels={this.removeLabels}
        />
        {displayForm ?
          <Compose
            sendMessage={this.sendMessage}
          />
        : null
        }
        <Messages
          messages={messages}
          updateStarredStatus={this.updateStarredStatus}
          toggleProperty={this.toggleProperty}
        />
      </div>
    );
  }
}

export default App;
