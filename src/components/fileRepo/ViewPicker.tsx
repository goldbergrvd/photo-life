import "./viewPicker.css";

import { ViewType } from "../../types";

interface Props {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

function ViewPicker({ viewType, setViewType } : Props) {
  let pickClassName = "day"
  let pickText = "日"

  if (viewType === ViewType.Year) {
    pickClassName = "year"
    pickText = "年"
  }

  if (viewType === ViewType.Month) {
    pickClassName = "month"
    pickText = "月"
  }

  return (
    <div className="view-picker">
      <div className={`picked ${pickClassName}`}>{pickText}</div>
      <div className="year" onClick={() => setViewType(ViewType.Year)}>年</div>
      <div className="month" onClick={() => setViewType(ViewType.Month)}>月</div>
      <div className="day" onClick={() => setViewType(ViewType.Day)}>日</div>
    </div>
  )
}

export default ViewPicker;
