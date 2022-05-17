import "./viewSwitch.css";

interface Props {
  component: JSX.Element;
}

function ViewSwitch({ component }: Props) {
  return (
    <div className="view-switch">
      {component}
    </div>
  )
}

export default ViewSwitch;
