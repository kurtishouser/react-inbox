import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessageBody } from '../actions';
import { bindActionCreators } from 'redux';

class MessageBody extends Component {
  componentDidMount() {
    this.props.fetchMessageBody(this.props.messageId);
    console.log('mounted!');
  }

  render() {
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
