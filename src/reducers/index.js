import { combineReducers } from 'redux';
import { MESSAGES_PENDING,
         MESSAGES_RECEIVED,
         SEND_MESSAGE,
         TOGGLE_SELECTED,
         TOGGLE_STARRED,
         TOGGLE_SELECT_ALL,
         UPDATE_READ_STATUS,
         ADD_LABEL,
         REMOVE_LABEL,
         DELETE_MESSAGES } from '../actions';

function messages(state = { ids:[], messagesById:{}, messagesLoading:false }, action) {
  switch (action.type) {

    case MESSAGES_PENDING:
      return { ...state, messagesLoading: true }

    case MESSAGES_RECEIVED:
      return {
       ids: action.messages.map(message => message.id),
       messagesById: action.messages.reduce((result, msg) => {
         msg.selected = false;
         result[msg.id] = msg;
         return result;
       }, {}),
       messagesLoading: false
      }

    case SEND_MESSAGE:
      console.log('TODO: SEND_MESSAGE reducer');
      return state;

    case TOGGLE_SELECTED:
     return {
       ...state,
       messagesById: {
         ...state.messagesById,
         [action.id]: {
           ...state.messagesById[action.id],
           selected: !state.messagesById[action.id].selected
         }
       }
     }

    case TOGGLE_STARRED:
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [action.id]: {
            ...state.messagesById[action.id],
            starred: !state.messagesById[action.id].starred
          }
        }
      }

    case TOGGLE_SELECT_ALL:
      console.log('reducer', action.status);

      var selectedIds = state.ids;
      var newState = {...state};
      var newMessagesById = {...state.messagesById};
      newState.messagesById = newMessagesById;

      selectedIds.forEach(id => {
        var newMsg = {...state.messagesById[id], selected: action.status};
        newState.messagesById[id] = newMsg;
      })

      return newState

    case UPDATE_READ_STATUS:

      var selectedIds = state.ids.filter(id => state.messagesById[id].selected);
      var newState = {...state};
      var newMessagesById = {...state.messagesById};
      newState.messagesById = newMessagesById;

      selectedIds.forEach(id => {
        var newMsg = {...state.messagesById[id], read: action.status};
        newState.messagesById[id] = newMsg;
      })

      return newState

    case ADD_LABEL:
      console.log('TODO: ADD_LABEL reducer');
      // react code for reference
      // this.setState((prevState) => {
      //   let messages = prevState.messages.map((msg) => {
      //     if (messageIds.includes(msg.id)) {
      //         let labels = msg.labels.slice();
      //         labels.push(label);
      //         return {...msg, labels: labels}
      //     } else {
      //       return msg;
      //     }
      //   });
      //
      //   return {messages};
      return state

    case REMOVE_LABEL:
      console.log('TODO: REMOVE_LABEL reducer');
      // react code for reference
      // this.setState((prevState) => {
      //   let messages = prevState.messages.map((msg) => {
      //     if (messageIds.includes(msg.id)) {
      //         let labels = msg.labels.slice();
      //         labels.splice(msg.labels.indexOf(label), 1);
      //         return {...msg, labels: labels}
      //     } else {
      //       return msg;
      //     }
      //   });
      //
      //   return {messages};
      return state

    case DELETE_MESSAGES:
      var remainingIds = state.ids.filter(id => !state.messagesById[id].selected);

      var newMsgs = { ...state.messagesById };

      state.ids.forEach(id => {
        if (newMsgs[id].selected) {
          delete newMsgs[id];
        }
      })

      return { ...state, ids: remainingIds, messagesById: newMsgs };

    default:
      return state
  }
}

export default combineReducers({
  messages
})
