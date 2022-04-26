import { connect } from "react-redux";
import { Dispatch } from "redux";
import { deleteMessage, MessagesAction } from "../actions";
import Messages from "../components/Messages";
import { StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    messages: state.messages
  }
}

function mapDispatchToProps(dispatch: Dispatch<MessagesAction>) {
  return {
    deleteMessage: (index: number) => dispatch(deleteMessage(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
