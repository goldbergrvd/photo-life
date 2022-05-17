import "./setting.css";

export interface Props {
  contentText: string;
  onClick: () => void;
}

function Pick({ contentText, onClick }: Props) {
  return (
    <div className="setting pick" onClick={onClick}>{contentText}</div>
  )
}

export default Pick