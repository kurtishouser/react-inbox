import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSelectAll, updateReadStatus, addLabel, removeLabel, deleteMessages } from '../actions';
import { bindActionCreators } from 'redux';

class Toolbar extends Component {


  selectAllButton() {
    let selectAllButtonIcon = '';
    switch(this.props.selectedMessageCount) {
      case 0:
        selectAllButtonIcon = 'fa-square-o'
        break;
      case this.props.messageIds.length:
        selectAllButtonIcon = 'fa-check-square-o'
        break;
      default:
        selectAllButtonIcon = 'fa-minus-square-o'
    }
    return selectAllButtonIcon;
  }

  render() {
    const { path, messageIds, selectedMessageCount, unreadMessageCount } = this.props;
    const disabled = !selectedMessageCount ? 'disabled' : '';
    const disableSelectAll = messageIds.length === 0 ? 'disabled' : ''; // edge case when there are no messages at all
    const selectAllButtonIcon = this.selectAllButton();
    const composeButtonLink = path !== '/compose' ? '/compose' : '/';

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessageCount}</span>
            unread {unreadMessageCount !== 1 ? 'messages' : 'message'}
          </p>

          <Link to={`${composeButtonLink}`} className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </Link>

          <button className={`btn btn-default ${disableSelectAll}`} onClick={() => this.props.toggleSelectAll((messageIds.length - selectedMessageCount > 0) ? true : false)}>
            <i className={`fa ${selectAllButtonIcon}`} />
          </button>

          <button className={`btn btn-default ${disabled}`} onClick={() => this.props.updateReadStatus(true)}>Mark As Read</button>

          <button className={`btn btn-default ${disabled}`} onClick={() => this.props.updateReadStatus(false)}>Mark As Unread</button>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={(e) => {this.props.addLabel(e.target.value); e.target.selectedIndex = 0}}>
            <option>Add label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={(e) => {this.props.removeLabel(e.target.value); e.target.selectedIndex = 0}}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className={`btn btn-default ${disabled}`} onClick={() => this.props.deleteMessages()}>
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const messageIds = state.messages.ids;
  const messagesById = state.messages.messagesById;
  const selectedMessageCount = messageIds.filter(id => messagesById[id].selected).length;
  const unreadMessageCount = messageIds.filter(id => !messagesById[id].read).length;
  const path = ownProps.match.path;
  return {
    path,
    messageIds,
    selectedMessageCount,
    unreadMessageCount,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelectAll,
  updateReadStatus,
  addLabel,
  removeLabel,
  deleteMessages
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
