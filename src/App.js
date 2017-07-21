import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
// import Compose from './components/Compose.js';
import Messages from './components/Messages.js';

class App extends Component {

  render() {
    return (
      <div className="container">
        <h1>Get all yer Redux in a row!</h1>
        <Toolbar />
        {/* {displayForm ? <Compose /> : null} */}
        <Messages />
      </div>
    );
  }

}

export default App;


// react
//
// sendMessage(message) {
//
//   let options = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify(message),
//   }
//
//   fetch(BASE_PATH, options)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       let message = {
//         id: result.id,
//         subject: result.subject,
//         starred: result.starred,
//         read: result.read,
//         labels: result.labels,
//         body: result.body,
//         selected: false,
//       }
//
//       this.setState((prevState) => {
//         return {
//           messages: [...prevState.messages, message],
//           displayForm: !prevState.displayForm,
//         }
//       });
//     });
// }
//
// getSelectedMessages() {
//   return this.state.messages.filter(msg => msg.selected);
// }
//
// displayComposeForm() {
//   this.setState((prevState) => {
//     return {
//       displayForm: !prevState.displayForm,
//     }
//   });
// }
// addLabels(label) {
//
//   let messageIds = this.getSelectedMessages()
//                        .filter((msg) => !msg.labels.includes(label))
//                        .map((msg) => msg.id);
//
//   if (messageIds.length !== 0) {
//     let options = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'PATCH',
//       body: JSON.stringify({
//         'messageIds': messageIds,
//         'command': 'addLabel',
//         'label': label,
//       }),
//     };
//
//     fetch(BASE_PATH, options)
//       .then((response) => {
//         if (response.status === 200) {
//
//           this.setState((prevState) => {
//             let messages = prevState.messages.map((msg) => {
//               if (messageIds.includes(msg.id)) {
//                   let labels = msg.labels.slice();
//                   labels.push(label);
//                   return {...msg, labels: labels}
//               } else {
//                 return msg;
//               }
//             });
//
//             return {messages};
//           });
//         }
//       });
//   }
// }
//
// removeLabels(label) {
//
//   let messageIds = this.getSelectedMessages()
//                        .filter((msg) => msg.labels.includes(label))
//                        .map((msg) => msg.id);
//
//   if (messageIds.length !== 0) {
//     let options = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'PATCH',
//       body: JSON.stringify({
//         'messageIds': messageIds,
//         'command': 'removeLabel',
//         'label': label,
//       }),
//     };
//
//     fetch(BASE_PATH, options)
//       .then((response) => {
//         if (response.status === 200) {
//
//           this.setState((prevState) => {
//             let messages = prevState.messages.map((msg) => {
//               if (messageIds.includes(msg.id)) {
//                   let labels = msg.labels.slice();
//                   labels.splice(msg.labels.indexOf(label), 1);
//                   return {...msg, labels: labels}
//               } else {
//                 return msg;
//               }
//             });
//
//             return {messages};
//           });
//         }
//       });
//   }
// }
// toggleProperty(message, property) {
//
//   this.setState((prevState) => {
//
//     const index = prevState.messages.indexOf(message);
//
//     return {
//       messages: [
//         ...prevState.messages.slice(0, index),
//         { ...message, [property]: !message[property] },
//         ...prevState.messages.slice(index + 1),
//       ],
//     };
//   })
// }
