import { ADD_ERROR_MESSAGE, ADD_INFO_MESSAGE, DELETE_MESSAGE } from "../constants"
import { Message, MessageType, Timestamp } from "../types";

export interface AddInfoMessage {
  type: ADD_INFO_MESSAGE;
  payload: Message
}

export interface AddErrorMessage {
  type: ADD_ERROR_MESSAGE;
  payload: Message
}

export interface AddInfoMessageMultiline {
  type: ADD_INFO_MESSAGE;
  payload: Message
}

export interface AddErrorMessageMultiline {
  type: ADD_ERROR_MESSAGE;
  payload: Message
}

export interface DeleteMessage {
  type: DELETE_MESSAGE;
  payload: Timestamp;
}

export type MessagesAction = AddInfoMessage | AddErrorMessage | AddInfoMessageMultiline | AddErrorMessageMultiline | DeleteMessage

export function addInfoMessage(title: string, content: string): MessagesAction {
  return {
    type: ADD_INFO_MESSAGE,
    payload: {
      type: MessageType.Info,
      title,
      contents: [content],
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
      contents: [content],
      time: new Date()
    }
  }
}

export function addInfoMessageMultiline(title: string, contents: Array<string>): MessagesAction {
  return {
    type: ADD_INFO_MESSAGE,
    payload: {
      type: MessageType.Info,
      title,
      contents,
      time: new Date()
    }
  }
}

export function addErrorMessageMultiline(title: string, contents: Array<string>): MessagesAction {
  return {
    type: ADD_ERROR_MESSAGE,
    payload: {
      type: MessageType.Error,
      title,
      contents,
      time: new Date()
    }
  }
}

export function deleteMessage(index: Timestamp): MessagesAction {
  return {
    type: DELETE_MESSAGE,
    payload: index
  }
}
