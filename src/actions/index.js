import store from '../store';
export const MESSAGES_PENDING = 'MESSAGES_PENDING';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export function fetchMessages() {
  return async (dispatch, getState, { Api }) => {

    if (getState().messages.ids.length) {
      return
    }

    dispatch({
      type: MESSAGES_PENDING
    });

    const json = await Api.fetchMessages();
    return dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    });
  }
}

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export function toggleSelected(id) {
  return {
      type: TOGGLE_SELECTED,
      id
  }
}

export const TOGGLE_STARRED = 'TOGGLE_STARRED';
export function toggleStarred(id) {
  return async (dispatch, getState, { Api }) => {

    let body = {
        'messageIds': [id],
        'command': 'star',
        'star': !getState().messages.messagesById[id].starred,
    }

    const response = await Api.patchRequest(body)

    return dispatch({
      type: TOGGLE_STARRED,
      id
  })
  }
}
