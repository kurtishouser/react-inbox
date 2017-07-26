import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessageBody } from '../actions';
import { bindActionCreators } from 'redux';

class MessageBody extends Component {
  componentDidMount() {
    console.log('mounted!');
    this.props.fetchMessageBody(this.props.messageId);
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
  console.log(ownProps);
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
