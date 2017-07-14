import React, {Component} from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleStarred = this.toggleStarred.bind(this);
  }

  toggleSelected () {
    let messageId = this.props.id;
    let status = !this.props.selected;
    this.props.updateSelectedStatus(messageId, status);
    // let message = this.props;
    // this.props.toggleProperty(message, 'selected');
  }

  toggleStarred() {
    let messageId = this.props.id;
    let status = !this.props.starred;
    this.props.updateStarredStatus(messageId, status);
    // let message = this.props;
    // this.props.toggleProperty(message, 'starred');
  }

  render() {
    const read = this.props.read ? 'read' : 'unread';
    const selected = this.props.selected ? 'selected' : '';
    const checked = this.props.selected ? true : false;
    const starred = this.props.starred ? 'fa-star' : 'fa-star-o';

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
          {this.props.labels.map((label) => {
            return <Label key={label} label={label} />
          })}
          <a href="/">
            {this.props.subject}
          </a>
        </div>
      </div>
    )
  }
}

export default Message;
