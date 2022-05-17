import "./viewPicker.css";

interface Props {
  pickText: string;
  pickClassName: string;
  toYear: () => void;
  toMonth: () => void;
  toDay: () => void;
}

function ViewPicker({ pickText, pickClassName, toYear, toMonth, toDay } : Props) {
  return (
    <div className="view-picker">
      <div className={`picked ${pickClassName}`}>{pickText}</div>
      <div className="year" onClick={toYear}>年</div>
      <div className="month" onClick={toMonth}>月</div>
      <div className="day" onClick={toDay}>日</div>
    </div>
  )
}

export default ViewPicker;
