import React, {Component} from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected,
      starred: this.props.starred,
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
    return (
      <div className={'row message' + (this.props.read ? ' read' : ' unread') + (this.state.selected ? ' selected' : '')}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={this.state.selected ? 'checked' : ''} onChange={() => this.toggleSelected()}/>
            </div>
            <div className="col-xs-2">
              <i className={'star fa ' + (this.state.starred ? 'fa-star' : 'fa-star-o')} onClick={() => this.toggleStarred()}></i>
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
