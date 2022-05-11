import "./albumCreator.css";
import { State } from "../types";

interface Props {
  state: State;
  submit: (name: string) => void;
  cancel: () => void;
}

function AlbumCreator({ state, submit, cancel }: Props) {
  let _input: HTMLInputElement;

  function onInputMount(input: HTMLInputElement) {
    if (input) {
      input.focus()
      _input = input
    }
  }

  function onSubmitClick() {
    let name = _input.value
    if (name) {
      submit(name)
    }
  }

  return (
    <div className={`album-creator ${state === State.AddAlbum ? '' : 'hide'}`}>
      <div className="modal">
        <div className="content">
          <div className="title">新增相簿</div>
          <input className="input" type="text" placeholder="相簿名稱" ref={c => onInputMount(c as HTMLInputElement)} />
        </div>
        <div className="btn">
          <div className="cancel" onClick={cancel}>取消</div>
          <div className="submit" onClick={onSubmitClick}>儲存</div>
        </div>
      </div>
    </div>
  )
}

export default AlbumCreator;
