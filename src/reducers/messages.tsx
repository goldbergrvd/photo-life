import { MessagesAction } from "../actions";
import { ADD_ERROR_MESSAGE, ADD_INFO_MESSAGE, DELETE_MESSAGE } from "../constants";
import { Message } from "../types";

export default function messages(messages: Array<Message> = [], action: MessagesAction) {
  const newMessages = [...messages]

  switch(action.type) {
    case ADD_INFO_MESSAGE:
    case ADD_ERROR_MESSAGE:
      newMessages.unshift(action.payload)
      return newMessages

    case DELETE_MESSAGE:
      newMessages.splice(action.payload, 1)
      return newMessages

    default:
      return messages
  }
}