import React from 'react'
import { shallow, render, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Message, mapStateToProps } from './Message'
import { fetchProducts, PRODUCTS_RECEIVED } from '../actions'

describe('Message', () => {

  it('should render without any props defined', () => {
    const component = shallow(
      <Message />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with props passed in', () => {
    const component = shallow(
      <Message ids={[1]} messagesById={{
        _links: {
          self: {
            href: "http://localhost:8181/api/messages/1"
          }
        },
        id: 1,
        subject: "Hi",
        starred: true,
        read: true,
        labels: [
          "dev",
          "personal"
        ],
        body: "Hello there",
        selected: false,
      }} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

});
