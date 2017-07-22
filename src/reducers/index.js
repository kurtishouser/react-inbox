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

  let newState = {};

  switch (action.type) {

    case MESSAGES_PENDING:
      return { ...state, messagesLoading: true };

    case MESSAGES_RECEIVED:
      return {
        ids: action.messages.map(message => message.id),
        messagesById: action.messages.reduce((result, msg) => {
          msg.selected = false;
          result[msg.id] = msg;
          return result;
        }, {}),
        messagesLoading: false
      };

    case SEND_MESSAGE:
      return {
        ...state,
        ids:
          [...state.ids, action.response.id],
        messagesById: {
          ...state.messagesById,
          [action.response.id]: action.response
        }
      }

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
      newState = {...state, newMessagesById: {...state.messagesById}};

      state.ids.forEach(id => {
        newState.messagesById[id] = {...state.messagesById[id], selected: action.status};
      });

      return newState;

    case UPDATE_READ_STATUS:
      newState = {...state, messagesById: {...state.messagesById}};

      action.messageIds.forEach(id => {
        newState.messagesById[id] = {...state.messagesById[id], read: action.status};
      });

      return newState;

    case ADD_LABEL:
      newState = {...state, messagesById: {...state.messagesById}};

      action.messageIds.forEach(id => {
        let labels = [ ...state.messagesById[id].labels, action.label ];
        newState.messagesById[id] = {...state.messagesById[id], labels: labels};
      });

      return newState;

    case REMOVE_LABEL:
      newState = {...state, messagesById: {...state.messagesById}};

      action.messageIds.forEach(id => {
        let labels = state.messagesById[id].labels.slice();
        labels.splice(state.messagesById[id].labels.indexOf(action.label), 1);
        newState.messagesById[id] = {...state.messagesById[id], labels: labels};
      });

      return newState;

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
