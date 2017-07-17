import React, {Component} from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleStarred = this.toggleStarred.bind(this);
  }

  toggleSelected() {
    let message = this.props.message;

    this.props.toggleProperty(message, 'selected');
  }

  toggleStarred() {
    let message = this.props.message;
    this.props.updateStarredStatus(message, 'star');
  }

  render() {
    const read = this.props.message.read ? 'read' : 'unread';
    const selected = this.props.message.selected ? 'selected' : '';
    const checked = this.props.message.selected ? true : false;
    const starred = this.props.message.starred ? 'fa-star' : 'fa-star-o';

    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={checked} onChange={this.toggleSelected}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred}`} onClick={this.toggleStarred}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.message.labels.map((label) => {
            return <Label key={label} label={label} />
          })}
          <a href="/">
            {this.props.message.subject}
          </a>
        </div>
      </div>
    )
  }
}

export default Message;
