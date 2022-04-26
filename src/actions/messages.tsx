import { ADD_ERROR_MESSAGE, ADD_INFO_MESSAGE, DELETE_MESSAGE } from "../constants"
import { Message, MessageType } from "../types";

export interface AddInfoMessage {
  type: ADD_INFO_MESSAGE;
  payload: Message
}

export interface AddErrorMessage {
  type: ADD_ERROR_MESSAGE;
  payload: Message
}

export interface DeleteMessage {
  type: DELETE_MESSAGE;
  payload: number;
}

export type MessagesAction = AddInfoMessage | AddErrorMessage | DeleteMessage

export function addInfoMessage(title: string, content: string): MessagesAction {
  return {
    type: ADD_INFO_MESSAGE,
    payload: {
      type: MessageType.Info,
      title,
      content,
      time: new Date()
    }
  }
}

export function addErrorMessage(title: string, content: string): MessagesAction {
  return {
    type: ADD_ERROR_MESSAGE,
    payload: {
      type: MessageType.Error,
      title,
      content,
      time: new Date()
    }
  }
}

export function deleteMessage(index: number): MessagesAction {
  return {
    type: DELETE_MESSAGE,
    payload: index
  }
}
