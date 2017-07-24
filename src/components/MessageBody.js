import React, { Component } from 'react';
// import Message from './Message.js';
import { connect } from 'react-redux';
import { fetchMessageBody } from '../actions';
import { bindActionCreators } from 'redux';

class MessageBody extends Component {

  render() {
    this.props.fetchMessageBody(this.props.messageId);
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {this.props.messageBody}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const messageId = ownProps.messageId;
  const messageBody = state.messages.messagesById[ownProps.messageId].body;
  return {
    messageId,
    messageBody
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessageBody
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBody);
