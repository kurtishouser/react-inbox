import React, {Component} from 'react';
import Label from './Label.js';

class Message extends Component {

  render() {
    return (
      <div className={'row message' + (this.props.read ? ' read' : ' unread') + (this.props.selected ? ' selected' : '')}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={this.props.selected ? 'checked' : ''}/>
            </div>
            <div className="col-xs-2">
              <i className={'star fa ' + (this.props.starred ? 'fa-star' : 'fa-star-o')}></i>
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
