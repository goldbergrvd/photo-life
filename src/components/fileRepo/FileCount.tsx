import "./fileCount.css"

export interface Props {
  textContent: string;
  isAlbum: boolean;
}

function FileCount({ textContent, isAlbum }: Props) {
  return (
    <div className={`file-count ${isAlbum ? 'white' : 'black'}`}>{ textContent }</div>
  )
}

export default FileCount;
