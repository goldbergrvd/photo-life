import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setTab, TabAction } from "../../actions";
import Tabs from "../../components/toolbar/Tabs";
import { StoreState, Tab } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab
  }
}

function mapDispatchToProps(dispatch: Dispatch<TabAction>) {
  return {
    setTab: (tab: Tab) => dispatch(setTab(tab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
