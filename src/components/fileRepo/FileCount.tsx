import "./fileCount.css"

export interface Props {
  textContent: string
}

function FileCount({ textContent }: Props) {
  return (
    <div className="file-count">{ textContent }</div>
  )
}

export default FileCount;
