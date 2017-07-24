import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSelected, toggleStarred } from '../actions';
import { bindActionCreators } from 'redux';
import MessageBody from './MessageBody.js';

import PropTypes from 'prop-types';

export class Message extends Component {

  render() {
    console.log(this.props.message);
    const { id, selected, read, starred, subject, labels } = this.props.message;
    const isRead = read ? 'read' : 'unread';
    const isSelected = selected ? 'selected' : '';
    const isChecked = selected ? true : false;
    const isStarred = starred ? 'fa-star' : 'fa-star-o';
    const displayMessageBody = parseInt(this.props.match.params.id, 10) === this.props.messageid;

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
            {labels.map((label) => {
              return <span key={label} className="label label-warning">{label}</span>
            })}
            <Link to={`/messages/${id}`}>{subject}</Link>
          </div>
        </div>
        {displayMessageBody &&
          <MessageBody messageId={id}/>
        }
    </div>
    )
  }
}

Message.propTypes = {
  // ids: PropTypes.array.isRequired,
  // messagesById: PropTypes.object.isRequired
  messageId: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

Message.defaultProps = {
  // ids: [],
  messageId: 0,
  message: {},
  match: {},
};

export const mapStateToProps = (state, ownProps) => {
  const message = state.messages.messagesById[ownProps.messageId];
  const match = ownProps.match;
  return {
    match,
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
