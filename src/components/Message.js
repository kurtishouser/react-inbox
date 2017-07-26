import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSelected, toggleStarred, fetchMessageBody } from '../actions';
import { bindActionCreators } from 'redux';
import MessageBody from './MessageBody.js';

class Message extends Component {

  render() {
    const { id, selected, read, starred, subject, labels } = this.props.message;
    const isRead= read ? 'read' : 'unread';
    const isSelected = selected ? 'selected' : '';
    const isChecked = selected ? true : false;
    const isStarred = starred ? 'fa-star' : 'fa-star-o';
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
            {labels.map((label) => {
              return <span key={label} className="label label-warning">{label}</span>
            })}
            <Link to={`/messages/${id}`}>{subject}</Link>
          </div>
        </div>

        <Route path={`/messages/${id}`} render={() => <MessageBody messageId={id} />}/>
        {/* {displayMessageBody && <MessageBody messageId={id}/>} */}
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const message = state.messages.messagesById[ownProps.messageId];
  return {
    message,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelected,
  toggleStarred,
  fetchMessageBody
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
