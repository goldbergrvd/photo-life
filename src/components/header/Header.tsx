import "./header.css";

import AlbumEditor from "../../containers/header/AlbumEditor";
import FileCount from "../../containers/header/FileCount";
import Pick from "../../containers/header/Pick";
import Uploader from "../../containers/header/Uploader";

interface Props {
  style: 'black' | 'white',
  isMediaRepo: boolean,
  isAlbum: boolean
}

function Header({ style, isMediaRepo, isAlbum }: Props) {
  return (
    <div className={`header ${style}`}>
      <FileCount />
      {isMediaRepo ? <Pick /> : ''}
      {isMediaRepo ? <Uploader /> : ''}
      {isAlbum ? <AlbumEditor /> : ''}
    </div>
  )
}

export default Header;
