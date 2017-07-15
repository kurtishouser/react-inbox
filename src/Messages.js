import React, { Component } from 'react';
import Message from './Message.js';

class Messages extends Component {

  render() {
    return (
      <div>
        {this.props.messages.map((message) => {
          return <Message
                    message={message}
                    key={message.id}
                    updateStarredStatus={this.props.updateStarredStatus}
                    toggleProperty={this.props.toggleProperty} />
        })}
      </div>
    )
  }
}

export default Messages;
