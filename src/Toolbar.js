import React, { Component } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);

    this.deleteSelected = this.deleteSelected.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
    this.markAsUnread = this.markAsUnread.bind(this);
  }

  messageCount() {
    return this.props.messages.length;
  }

  selectedMessageCount() {
    return this.props.messages.filter(msg => msg.selected).length;
  }

  starredMessageCount() {
    return this.props.messages.filter(msg => msg.starred).length;
  }

  readMessageCount() {
    return this.props.messages.filter(msg => msg.read).length;
  }

  selectAllButtonStatus() {
    if (this.selectedMessageCount() === 0) {
      return 'fa-square-o';
    } else if (this.selectedMessageCount() === this.messageCount()) {
      return 'fa-check-square-o';
    } else if (this.selectedMessageCount() < this.messageCount()) {
      return 'fa-minus-square-o';
    }
  }

  getSelectedMessageIds() {
    return this.props.messages.filter(msg => msg.selected)
                              .map(item => item.id);
  }

  markAsRead() {
    this.props.updateReadStatus(this.getSelectedMessageIds(), true);
  }

  markAsUnread() {
    this.props.updateReadStatus(this.getSelectedMessageIds(), false);
  }

  deleteSelected() {
    this.props.deleteMessages(this.getSelectedMessageIds());
  }

  render() {
    const disabled = this.selectedMessageCount() === 0 ? 'disabled' : '';
    const disableSelectAll = this.messageCount() === 0 ? 'disabled' : ''; // edge case when there are no messages at all
    const unreadMessages = this.messageCount() - this.readMessageCount();
    const selectAllButtonIcon = this.selectAllButtonStatus();

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessages}</span>
            unread message{unreadMessages !== 1 ? 's' : ''}
          </p>

          <button className={`btn btn-default ${disableSelectAll}`}>
            <i className={`fa ${selectAllButtonIcon}`} />
          </button>

          <button className={`btn btn-default ${disabled}`} onClick={this.markAsRead}>Mark As Read</button>

          <button className={`btn btn-default ${disabled}`} onClick={this.markAsUnread}>Mark As Unread</button>

          <select className='form-control label-select' disabled={`${disabled}`}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className='form-control label-select'  disabled={`${disabled}`}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className={`btn btn-default ${disabled}`} onClick={this.deleteSelected}>
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;
