import React, { Component } from 'react';
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
    const { messageIds, selectedMessageCount, unreadMessageCount } = this.props;
    const disabled = !selectedMessageCount ? 'disabled' : '';
    const disableSelectAll = messageIds.length === 0 ? 'disabled' : ''; // edge case when there are no messages at all
    const selectAllButtonIcon = this.selectAllButton();

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessageCount}</span>
            unread {unreadMessageCount !== 1 ? 'messages' : 'message'}
          </p>

          <a className="btn btn-danger" onClick={this.toggleComposeForm}>
            <i className="fa fa-plus"></i>
          </a>

          <button className={`btn btn-default ${disableSelectAll}`} onClick={() => this.props.toggleSelectAll((messageIds.length - selectedMessageCount > 0) ? true : false)}>
            <i className={`fa ${selectAllButtonIcon}`} />
          </button>

          <button className={`btn btn-default ${disabled}`} onClick={() => this.props.updateReadStatus(true)}>Mark As Read</button>

          <button className={`btn btn-default ${disabled}`} onClick={() => this.props.updateReadStatus(false)}>Mark As Unread</button>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={(e) => this.props.addLabel(e.target.value)}>
            <option value="">Add label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={(e) => this.props.removeLabel(e.target.value)}>
            <option value="">Remove label</option>
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

const mapStateToProps = state => {
  const messageIds = state.messages.ids;
  const messagesById = state.messages.messagesById;
  const selectedMessageCount = messageIds.filter(id => messagesById[id].selected ).length;
  const unreadMessageCount = messageIds.filter(id => !messagesById[id].read ).length;

  return {
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

// react version
// constructor(props) {
//   super(props);
//
//   this.toggleComposeForm = this.toggleComposeForm.bind(this);
//   this.toggleSelected = this.toggleSelected.bind(this);
//   this.toggleRead = this.toggleRead.bind(this);
//   this.deleteSelected = this.deleteSelected.bind(this);
//   this.addLabel = this.addLabel.bind(this);
//   this.removeLabel = this.removeLabel.bind(this);
// }

// messageCount() {
//   return this.props.messages.length;
// }
//
// selectedMessageCount() {
//   return this.props.messages.filter(msg => msg.selected).length;
// }
//
// readMessageCount() {
//   return this.props.messages.filter(msg => msg.read).length;
// }
//
// toggleComposeForm() {
//   this.props.displayComposeForm();
// }
//
// selectAllButtonStatus() {
//   if (this.selectedMessageCount() === 0) {
//     return 'fa-square-o';
//   } else if (this.selectedMessageCount() === this.messageCount()) {
//     return 'fa-check-square-o';
//   } else if (this.selectedMessageCount() < this.messageCount()) {
//     return 'fa-minus-square-o';
//   }
// }
//
// toggleSelected() {
//   let status = (this.messageCount() - this.selectedMessageCount() > 0) ? true : false;
//   this.props.updateSelectedAllStatus(status);
// }
//
// toggleRead(e) {
//   const status = parseInt(e.target.value, 10) ? true : false;
//   this.props.updateReadStatus(status);
// }
//
// addLabel(e) {
//   let label = e.target.value;
//   if (label !== '') this.props.addLabels(label, 'addLabel');
// }
//
// removeLabel(e) {
//   let label = e.target.value;
//   if (label !== '') this.props.removeLabels(label);
// }
//
// deleteSelected() {
//   this.props.deleteMessages();
// }
