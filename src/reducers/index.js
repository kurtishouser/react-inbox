import { combineReducers } from 'redux';
import { MESSAGES_PENDING,
         MESSAGES_RECEIVED,
         TOGGLE_SELECTED,
         TOGGLE_STARRED } from '../actions';


function messages(state = { ids:[], messagesById:{}, messagesLoading:false }, action) {
  switch (action.type) {

    case MESSAGES_PENDING:
      return { ...state, messagesLoading: true }

    case MESSAGES_RECEIVED:
      const { messages } = action;
       return {
         ids: messages.map(message => message.id),
         messagesById: messages.reduce((result, msg) => {
           msg.selected = false;
           result[msg.id] = msg
           return result
         }, {}),
         messagesLoading: false
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
      const { id } = action;

      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [id]: {
            ...state.messagesById[id],
            starred: !state.messagesById[id].starred
          }
        }
      }

    default:
      return state
  }
}

export default combineReducers({
  messages
})



// return {
//         ...state,
//         messagesById: {
//           ...state.messagesById,
//           [msg.id]: {
//             ...state.messagesById[msg.id],
//             [property]: !state.messagesById[msg.id][property]
//           }
//         }
//       };
