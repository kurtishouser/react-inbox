import React from 'react'
import { shallow, render, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Messages, mapStateToProps } from './Messages'
import { fetchMessages, MESSAGES_RECEIVED } from '../actions'

describe('Messages', () => {

  it('should render without any props defined', () => {
    const component = shallow(
      <Messages messageIds={[]}/>
    );
    expect(toJson(component)).toMatchSnapshot();
  })

  it('Calls fetchMessages on load', () => {
    let fetchMessages = jest.fn()
    const component = mount(
      <Messages messageIds={[]}/>
    )
    expect(fetchMessages).toHaveBeenCalled();
  });

});
