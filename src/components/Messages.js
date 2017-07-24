import React, { Component } from 'react';
import Message from './Message.js';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions';
import { bindActionCreators } from 'redux';

export class Messages extends Component {

  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { loading, messageIds } = this.props;
    return !loading ?
      (
        <div>
          { messageIds.map((messageId) => <Message key={messageId} messageId={messageId} match={this.props.match}/>) }
        </div>
      ) :
      (<div>Loading...</div>)
  }
}

export const mapStateToProps = (state, ownProps) => {
  const loading = state.messages.messagesLoading;
  const messageIds = state.messages.ids;
  return {
    loading,
    messageIds
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
