import "./album.css";
import AlbumList from "../../containers/fileRepo/AlbumList";
import FileCount from "../../containers/fileRepo/FileCount";
import AlbumEditor from "../../containers/fileRepo/AlbumEditor";
import { setThemeColor } from "../../native-dom";
import React from "react";
import { COLOR_BLACK, COLOR_WHITE } from "../../constants";
import AlbumBrowsing from "../../containers/fileRepo/AlbumBrowsing";

interface Props {

}

class Album extends React.Component<Props, object> {

  componentDidMount() {
    setThemeColor(COLOR_WHITE)
  }

  componentWillUnmount() {
    setThemeColor(COLOR_BLACK)
  }

  render () {
    return (
      <div className="album">
        <AlbumList />
        <AlbumBrowsing />
        <FileCount />
        <AlbumEditor />
      </div>
    )
  }
}

export default Album;
