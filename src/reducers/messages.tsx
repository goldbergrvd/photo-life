import { MessagesAction } from "../actions";
import { ADD_ERROR_MESSAGE, ADD_INFO_MESSAGE, DELETE_MESSAGE } from "../constants";
import { Messages } from "../types";

export default function messages(messages: Messages = new Map(), action: MessagesAction) {
  const newMessages = new Map(messages)

  switch(action.type) {
    case ADD_INFO_MESSAGE:
    case ADD_ERROR_MESSAGE:
      newMessages.set(action.payload.time.getTime(), action.payload)
      return newMessages

    case DELETE_MESSAGE:
      newMessages.delete(action.payload)
      return newMessages

    default:
      return messages
  }
}
