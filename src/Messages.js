import React, { Component } from 'react';
import Message from './Message.js';

class Messages extends Component {

  render() {
    return (
      <div>
        {this.props.messages.map((message) => {
          return <Message key={message.id} read={message.read} starred={message.starred} selected={message.selected} labels={message.labels} subject={message.subject} />
        })}
      </div>
    )
  }
}

export default Messages;
