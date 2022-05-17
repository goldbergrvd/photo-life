import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setViewType, ViewTypeAction } from "../../actions";
import ViewPicker from "../../components/view/ViewPicker";
import { StoreState, ViewType } from "../../types";

function mapStateToProps(state: StoreState) {
  let pickClassName = "day"
  let pickText = "日"

  if (state.viewType === ViewType.Year) {
    pickClassName = "year"
    pickText = "年"
  }

  if (state.viewType === ViewType.Month) {
    pickClassName = "month"
    pickText = "月"
  }

  return {
    pickText,
    pickClassName
  }
}

function mapDispatchToProps(dispatch: Dispatch<ViewTypeAction>) {
  return {
    toYear: () => dispatch(setViewType(ViewType.Year)),
    toMonth: () => dispatch(setViewType(ViewType.Month)),
    toDay: () => dispatch(setViewType(ViewType.Day))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPicker);
