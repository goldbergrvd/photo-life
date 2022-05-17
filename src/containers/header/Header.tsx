import { connect } from "react-redux";
import { StoreState, Tab } from "../../types";
import Header from "../../components/header/Header";

interface StateProps {
  style: 'black' | 'white';
  isMediaRepo: boolean;
  isAlbum: boolean;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    style: state.tab === Tab.Album ? 'white' : 'black',
    isMediaRepo: [Tab.ImageRepo, Tab.VideoRepo].includes(state.tab),
    isAlbum: state.tab === Tab.Album
  }
}

export default connect(mapStateToProps)(Header);
