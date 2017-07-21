import { combineReducers } from 'redux';
import { MESSAGES_PENDING,
         MESSAGES_RECEIVED,
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
      // const { messages } = action;
       return {
         ids: action.messages.map(message => message.id),
         messagesById: action.messages.reduce((result, msg) => {
           msg.selected = false;
           result[msg.id] = msg;
           return result;
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
        // let newMsg = Object.assign({}, state.messagesById[id], {read: action.status});
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
        // let newMsg = Object.assign({}, state.messagesById[id], {read: action.status});
        newState.messagesById[id] = newMsg;
      })

      // ---------
      // let updatedMsg = {};
      // let newMessages = {};
      // for (var key in state.messagesById) {
      //   if (state.messagesById[key].selected) {
      //     newMessages = {...state.messagesById,
      //                    [state.messagesById[key].id]: {
      //                      ...state.messagesById[key],
      //                      read: action.status}};
      //     console.log(newMessages);
      //     // updatedMsg = {...state.messagesById[key], read: action.status};
      //     console.log(updatedMsg);
      //   }
      //   else {
      //     // newMessages = {...state.messagesById};
      //   }
      // }
      // --------------
      // let stateClone = { ...state.messagesById };
      // for (var key in state.messagesById) {
      //   if (state.messagesById[key].selected) {
      //     stateClone = {[state.messagesById[key]]:{...state.messagesById[key], read: action.status}, ...stateClone};
      //
      //   }
      // }
      // console.log(stateClone);

      return newState

    case ADD_LABEL:
      console.log('ADD_LABEL reducer');
      return state

    case REMOVE_LABEL:
    console.log('REMOVE_LABEL reducer');
    return state


    case DELETE_MESSAGES:
    console.log('DELETE_MESSAGES reducer');


    return state


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
