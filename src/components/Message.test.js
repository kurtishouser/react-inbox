import React from 'react'
import { shallow, render, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Message, mapStateToProps } from './Message'
import { fetchMessages, PRODUCTS_RECEIVED } from '../actions'

describe('Message', () => {

  it('should render without any props defined', () => {
    const component = shallow(
      <Message match={{params:{id:1}}}/>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with props passed in', () => {
    const component = shallow(
      <Message message={{
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
      }} match={{params:{id:1}}} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps', () => {
    const state = {
      messages: {
        ids: [1],
        messagesById: {
          1: {
            _links: {
              self: {
                href: "http://localhost:8181/api/messages/1"
              }
            },
            id: 1,
            subject: "Hi",
            starred: true,
            read: true,
            labels: ["dev", "personal"],
            body: "Hello there",
            selected: false,
          }
        }
      }
    }
    const ownProps = { messageId: 1};
    const expected = {
      message: {
          _links: {
            self: {
              href: "http://localhost:8181/api/messages/1"
            }
          },
          id: 1,
          subject: "Hi",
          starred: true,
          read: true,
          labels: ["dev", "personal"],
          body: "Hello there",
          selected: false,
      }
    }
    expect(mapStateToProps(state, ownProps)).toEqual(expected)
  })

  xit('has a CHECKBOX that changes after click', () => {
    const toggleSelected = jest.fn();
    const message = shallow(
      <Message message={{
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
      }} match={{params:{id:1}}} />,
    );

    const checkbox = message.find({ type: 'checkbox' });
    console.log('chk',checkbox);

    expect(checkbox.props().checked).toEqual(false);
    checkbox.simulate('change');
    expect(checkbox.props().checked).toEqual(true);
  });

  it('simulate star clicked', () => {
    const wrapper = shallow(
      <Message match={{params:{id:1}}}/>
    );
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('.star.fa').simulate('click');

    expect(wrapper).toMatchSnapshot();
});

});
