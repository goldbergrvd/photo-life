import "./alert.css"

interface Props {
  hide: boolean;
  submitContent: string | JSX.Element;
  submit: () => void;
  cancel: () => void;
}

function Alert({ hide, submitContent, submit, cancel }: Props) {
  return (
    <div className={'alert' + (hide ? ' hide' : '')}>
      <div className="btn">
        <button className="submit" onClick={submit}>{submitContent}</button>
        <button className="cancel" onClick={cancel}>取消</button>
      </div>
    </div>
  )
}

export default Alert;
