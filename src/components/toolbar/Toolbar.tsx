import "./toolbar.css"

export interface Props {
  component: JSX.Element;
}

function Toolbar({ component }: Props) {
  return (
    <div className="toolbar">
      {component}
    </div>
  )
}

export default Toolbar;