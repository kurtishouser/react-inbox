import React, {Component} from 'react';
import { connect } from 'react-redux';
import Label from './Label.js';
import { toggleSelected, toggleStarred } from '../actions';
import { bindActionCreators } from 'redux';

class Message extends Component {

  render() {
    const { id, selected, read, starred, subject, labels } = this.props.message;
    const isRead= read ? 'read' : 'unread';
    const isSelected = selected ? 'selected' : '';
    const isChecked = selected ? true : false;
    const isStarred = starred ? 'fa-star' : 'fa-star-o';

    return (
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
            return <Label key={label} label={label} />
          })}
          <a href="/">
            {subject}
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const message = state.messages.messagesById[ownProps.messageId];
  // const { selected, read, starred, subject, labels } = message;
  return {
    message,
    // selected, read, starred, subject, labels
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
