import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendMessage } from '../actions';
import { bindActionCreators } from 'redux';

class ComposeForm extends Component {

  constructor(props) {
    super(props);

    this.state = {messageSubmitted: false}
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    let submittedMessage = {
      subject: e.target.subject.value,
      body: e.target.body.value,
    }

    if(submittedMessage.subject !== '' && submittedMessage.body !== '') {
      this.setState({ messageSubmitted: true});
      this.props.sendMessage(submittedMessage);
    }
  }

  render() {
    return(
      <div>
      <form className="form-horizontal well" onSubmit={this.submitForm}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
      {this.state.messageSubmitted && <Redirect to="/" />}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(ComposeForm);
