import "./messages.css";

import { faCircleExclamation, faCircleInfo, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Message, Messages, MessageType, Timestamp } from "../types";

interface Props {
  messages: Messages;
  deleteMessage: (index: Timestamp) => void;
}

const AUTO_DELETE_TIME = 5000
const TRANSITIO_TIME = 250

class MessagesComponent extends React.Component<Props, object> {

  _messageMap: Map<Timestamp, { element: HTMLDivElement, timeoutId: number }> = new Map();

  time(date: Date) {
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    return hour + ':' + minute + ':' + second
  }

  onMessageMount(index: Timestamp, message: Message, messageEle: HTMLDivElement) {
    if (messageEle === null) {
      this._messageMap.delete(index)
      return
    }

    this._messageMap.set(index, { element: messageEle, timeoutId: 0 })
    setTimeout(() => { messageEle.style.left = '0' }, 0)

    if (message.type === MessageType.Info && this._messageMap.has(index)) {
      let timeoutId = window.setTimeout(() => this.onDeleteMessage(index), AUTO_DELETE_TIME)
      this._messageMap.get(index)!.timeoutId = timeoutId
    }
  }

  onDeleteMessage(index: Timestamp) {
    const { deleteMessage } = this.props

    if (this._messageMap.has(index)) {
      let messageEle = this._messageMap.get(index)
      messageEle!.element.style.left = '100%'
      setTimeout(() => { deleteMessage(index) }, TRANSITIO_TIME)
      clearTimeout(messageEle!.timeoutId)
    }
  }

  render() {
    const { messages } = this.props

    return (
      <div className="messages">
        {
          Array.from(messages).map(([index, message]) => (
            <div className={'message' + (message.type === MessageType.Error ? ' error' : '')}
                 key={message.time.getTime()}
                 ref={c => this.onMessageMount(index, message, c as HTMLDivElement)}>
              <div className="title">
                <FontAwesomeIcon className="icon" icon={message.type === MessageType.Error ? faCircleExclamation : faCircleInfo} />
                {' ' + message.title}
              </div>
              {
                message.contents.map((content, i) => (
                  <p className="content" key={i}>{content}</p>
                ))
              }
              <div className="time">{this.time(message.time)}</div>
              <FontAwesomeIcon className="close" icon={faClose} onClick={() => this.onDeleteMessage(index)} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default MessagesComponent;
