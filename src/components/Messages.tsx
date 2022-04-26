import "./messages.css";

import { faCircleInfo, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Message, Messages, MessageType, Timestamp } from "../types";

interface Props {
  messages: Messages;
  deleteMessage: (index: Timestamp) => void;
}

class MessagesComponent extends React.Component<Props, object> {

  _messageEles: Map<Timestamp, { messageEle: HTMLDivElement, timeoutId: number }> = new Map();

  time(date: Date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  onMessageMount(index: Timestamp, message: Message, messageEle: HTMLDivElement) {
    if (messageEle === null) {
      this._messageEles.delete(index)
      return
    }

    this._messageEles.set(index, { messageEle, timeoutId: 0 })
    setTimeout(() => { messageEle.style.left = '0' }, 0)

    if (message.type === MessageType.Info && this._messageEles.has(index)) {
      let timeoutId = window.setTimeout(() => this.onDeleteMessage(index), 5000)
      this._messageEles.get(index)!.timeoutId = timeoutId
    }
  }

  onDeleteMessage(index: Timestamp) {
    const { deleteMessage } = this.props

    this._messageEles.get(index)!.messageEle.style.left = '100%'
    setTimeout(() => { deleteMessage(index) }, 250)
    if (this._messageEles.has(index)) {
      clearTimeout(this._messageEles.get(index)!.timeoutId)
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
              <div className="title"><FontAwesomeIcon className="icon" icon={faCircleInfo} /> {message.title}</div>
              <p className="content">{message.content}</p>
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
