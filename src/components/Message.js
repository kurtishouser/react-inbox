import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSelected, toggleStarred } from '../actions';
import { bindActionCreators } from 'redux';
import MessageBody from './MessageBody.js';

import PropTypes from 'prop-types';

export class Message extends Component {

  render() {
    console.log(this.props);
    // const { id, selected, read, starred, subject, labels } = this.props.message;
    const isRead = this.props.message.read ? 'read' : 'unread';
    const isSelected = this.props.message.selected ? 'selected' : '';
    const isChecked = this.props.message.selected ? true : false;
    const isStarred = this.props.message.starred ? 'fa-star' : 'fa-star-o';
    const displayMessageBody = parseInt(this.props.match.params.id, 10) === this.props.messageid;

    // const { id, selected, read, starred, subject, labels } = this.props.message;
    // const isRead= read ? 'read' : 'unread';
    // const isSelected = selected ? 'selected' : '';
    // const isChecked = selected ? true : false;
    // const isStarred = starred ? 'fa-star' : 'fa-star-o';
    // const displayMessageBody = parseInt(this.props.match.params.id, 10) === id;

    return (
      <div>

        <div className={`row message ${isRead} ${isSelected}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={isChecked} onChange={() => this.props.toggleSelected(this.props.messageId)}/>
              </div>
              <div className="col-xs-2">
                <i className={`star fa ${isStarred}`} onClick={() => this.props.toggleStarred(this.props.messageId)}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.props.message.labels.map((label) => {
              return <span key={label} className="label label-warning">{label}</span>
            })}
            <Link to={`/messages/${this.props.message.id}`}>{this.props.message.subject}</Link>
          </div>
        </div>
        {displayMessageBody &&
          <MessageBody messageId={this.props.message.id}/>
        }
    </div>
    )
  }
}

Message.propTypes = {
  ids: PropTypes.array.isRequired,
  messagesById: PropTypes.object.isRequired
};

Message.defaultProps = {
  ids: [],
  messagesById: {}
};

export const mapStateToProps = (state, ownProps) => {
  const message = state.messages.messagesById[ownProps.messageId];
  return {
    message,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelected,
  toggleStarred
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
