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

export const SEND_MESSAGE = 'SEND_MESSAGE';
export function sendMessage(message) {
  return async (dispatch, getState, { Api }) => {
    let body = message;
    const response = await Api.sendMessage(body);
    return dispatch({
      type: SEND_MESSAGE,
      response
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

    const response = await Api.patchRequest(body);

    if (response === 200) {
      return dispatch({
        type: TOGGLE_STARRED,
        id
      });
    }
  }
}

export const TOGGLE_SELECT_ALL ='TOGGLE_SELECT_ALL';
export function toggleSelectAll(status) {
  console.log(status);
  return {
    type: TOGGLE_SELECT_ALL,
    status
  }
}

export const UPDATE_READ_STATUS = 'UPDATE_READ_STATUS';
export function updateReadStatus(status) {
  return async (dispatch, getState, { Api }) => {

      let body = {
        'messageIds': getState().messages.ids.filter(id => (
          getState().messages.messagesById[id].selected)),
        'command': 'read',
        'read': status,
      }

      const response = await Api.patchRequest(body)

      if (response === 200) {
        return dispatch({
          type: UPDATE_READ_STATUS,
          status
        });
      }
  }
}

export const ADD_LABEL = 'ADD_LABEL';
export function addLabel(label) {
  return async (dispatch, getState, { Api }) => {

      let body = {
        'messageIds': getState().messages.ids.filter(id => (
          getState().messages.messagesById[id].selected &&
          !getState().messages.messagesById[id].labels.includes(label))),
        'command': 'addLabel',
        'label': label,
      }

      const response = await Api.patchRequest(body)

      if (response === 200) {
        return dispatch({
          type: ADD_LABEL,
          label
        });
      }
  }
}

export const REMOVE_LABEL = 'REMOVE_LABEL';
export function removeLabel(label) {
  return async (dispatch, getState, { Api }) => {

      let body = {
        'messageIds': getState().messages.ids.filter(id => (
          getState().messages.messagesById[id].selected &&
          getState().messages.messagesById[id].labels.includes(label))),
        'command': 'removeLabel',
        'label': label,
      }

      const response = await Api.patchRequest(body)

      if (response === 200) {
        return dispatch({
          type: REMOVE_LABEL,
          label
        });
      }
  }
}

export const DELETE_MESSAGES= 'DELETE_MESSAGES';
export function deleteMessages() {
  return async (dispatch, getState, { Api }) => {

      let body = {
        'messageIds': getState().messages.ids.filter(id => (
          getState().messages.messagesById[id].selected)),
        'command': 'delete',
      }

      const response = await Api.patchRequest(body)

      if (response === 200) {
        return dispatch({
          type: DELETE_MESSAGES,
        });
      }
  }
}
