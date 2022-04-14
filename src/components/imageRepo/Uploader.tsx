import "./setting.css"

import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent } from "react";
import { State } from "../../types";

interface Props {
  state: State;
  uploadProgress: number;
  upload: (formData: FormData) => void;
}

function Uploader({ state, uploadProgress, upload }: Props) {
  console.log(uploadProgress)


  let _input: HTMLInputElement;

  function onClick() {
    if (state === State.Browse) {
      _input.click()
    }
  }

  function onChange(evt: ChangeEvent) {
    let formData = new FormData()

    Array.prototype.forEach.call(_input.files, file => {
      formData.append('files', file)
    })

    upload(formData)
  }

  function switchUploadIcon() {
    switch(state) {
      case State.Browse:
        return <FontAwesomeIcon icon={faPlus} />
      case State.Upload:
        return <FontAwesomeIcon icon={faSpinner} spin />
      default:
        return <FontAwesomeIcon icon={faPlus} />
    }
  }

  return (
    <div className="setting uploader" onClick={onClick}>
      { switchUploadIcon() }
      <input multiple type="file" onChange={onChange} ref={c => _input = c as HTMLInputElement} />
    </div>
  )
}

export default Uploader;
