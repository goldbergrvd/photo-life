import "./album.css";
import React from "react";
import AlbumList from "../../containers/listview/AlbumList";
import AlbumBrowsing from "../../containers/listview/AlbumBrowsing";
import { setThemeColor } from "../../native-dom";
import { COLOR_BLACK, COLOR_WHITE } from "../../constants";

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
      </div>
    )
  }
}

export default Album;
