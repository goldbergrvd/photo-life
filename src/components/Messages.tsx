import "./messages.css";

import { faCircleInfo, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Messages, MessageType } from "../types";

interface Props {
  messages: Messages;
  deleteMessage: (index: number) => void;
}

class MessagesComponent extends React.Component<Props, object> {

  _messageEles: HTMLDivElement[] = [];

  time(date: Date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  onMessageMount(index: number,messageEle: HTMLDivElement) {
    if (messageEle === null) {
      this._messageEles.splice(index, 1)
      return
    }

    this._messageEles[index] = messageEle
    setTimeout(() => { messageEle.style.left = '0' }, 0)

  }

  onDeleteMessage(index: number) {
    const { deleteMessage } = this.props

    this._messageEles[index].style.left = '100%'
    setTimeout(() => { deleteMessage(index) }, 250)
  }

  render() {
    const { messages } = this.props

    return (
      <div className="messages">
        {
          messages.map((message, i) => (
            <div className={'message' + (message.type === MessageType.Error ? ' error' : '')}
                 key={message.time.getTime()}
                 ref={c => this.onMessageMount(i, c as HTMLDivElement)}>
              <div className="title"><FontAwesomeIcon className="icon" icon={faCircleInfo} /> {message.title}</div>
              <p className="content">{message.content}</p>
              <div className="time">{this.time(message.time)}</div>
              <FontAwesomeIcon className="close" icon={faClose} onClick={() => this.onDeleteMessage(i)} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default MessagesComponent;
