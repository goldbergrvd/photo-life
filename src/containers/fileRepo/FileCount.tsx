import { connect } from "react-redux";
import FileCount from "../../components/fileRepo/FileCount";
import { StoreState, Tab } from "../../types";

function mapStateToProps(state: StoreState) {
  const { photoList, videoList, tab } = state
  let textContent = ''
  switch (tab) {
    case Tab.ImageRepo:
      textContent = photoList.length + '張照片'
      break
    case Tab.VideoRepo:
      textContent = videoList.length + '支影片'
      break
  }

  return { textContent }
}

export default connect(mapStateToProps)(FileCount)
