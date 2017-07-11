import React, {Component} from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      read: this.props.read,
      selected: this.props.selected,
      starred: this.props.starred,
      labels: this.props.labels,
    }
  }

  toggleSelected () {
    let selected = !this.state.selected;
    this.setState({selected});
  }

  toggleStarred() {
    let starred = !this.state.starred;
    this.setState({starred});
  }

  render() {

    const read = this.state.read ? 'read' : 'unread';
    const selected = this.state.selected ? 'selected' : '';
    const checked = this.state.selected ? 'checked' : '';
    const starred = this.state.starred ? 'fa-star' : 'fa-star-o';

    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={checked} onChange={() => this.toggleSelected()}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred}`} onClick={() => this.toggleStarred()}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.state.labels.map((label) => {
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
