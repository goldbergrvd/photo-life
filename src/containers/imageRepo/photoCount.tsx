import { connect } from "react-redux";
import PhotoCount from "../../components/photoCount";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList
  }
}

export default connect(mapStateToProps)(PhotoCount)
