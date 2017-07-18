import React, { Component } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);

    this.toggleComposeForm = this.toggleComposeForm.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
  }

  messageCount() {
    return this.props.messages.length;
  }

  selectedMessageCount() {
    return this.props.messages.filter(msg => msg.selected).length;
  }

  readMessageCount() {
    return this.props.messages.filter(msg => msg.read).length;
  }

  toggleComposeForm() {
    this.props.displayComposeForm();
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

  toggleSelected() {
    let status = (this.messageCount() - this.selectedMessageCount() > 0) ? true : false;
    this.props.updateSelectedAllStatus(status);
  }

  toggleRead(e) {
    const status = parseInt(e.target.value, 10) ? true : false;
    this.props.updateReadStatus(status);
  }

  addLabel(e) {
    let label = e.target.value;
    if (label !== '') this.props.addLabels(label, 'addLabel');
  }

  removeLabel(e) {
    let label = e.target.value;
    if (label !== '') this.props.removeLabels(label);
  }

  deleteSelected() {
    this.props.deleteMessages();
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

          <a className="btn btn-danger" onClick={this.toggleComposeForm}>
            <i className="fa fa-plus"></i>
          </a>

          <button className={`btn btn-default ${disableSelectAll}`} onClick={this.toggleSelected}>
            <i className={`fa ${selectAllButtonIcon}`} />
          </button>

          <button className={`btn btn-default ${disabled}`} value="1" onClick={this.toggleRead}>Mark As Read</button>

          <button className={`btn btn-default ${disabled}`} value="0" onClick={this.toggleRead}>Mark As Unread</button>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={this.addLabel}>
            <option value="">Add label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className='form-control label-select' disabled={`${disabled}`} onChange={this.removeLabel}>
            <option value="">Remove label</option>
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
