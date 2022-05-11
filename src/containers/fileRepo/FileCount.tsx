import { connect } from "react-redux";
import FileCount from "../../components/fileRepo/FileCount";
import { StoreState, Tab } from "../../types";

function mapStateToProps(state: StoreState) {
  const { photoList, videoList, albumList, tab } = state
  let textContent = ''
  let isAlbum = tab === Tab.Album
  let album = albumList.find(album => album.browsing)

  switch (tab) {
    case Tab.ImageRepo:
      textContent = photoList.length + '張照片'
      break
    case Tab.VideoRepo:
      textContent = videoList.length + '支影片'
      break
    case Tab.Album:
      if (!album) {
        textContent = albumList.length + '個相簿'
      } else {
        textContent = album!.name
      }
  }

  return { textContent, isAlbum }
}

export default connect(mapStateToProps)(FileCount)
