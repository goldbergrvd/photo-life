import "./photoLoader.css";
import api from "../api";
import axios from "axios";
import pikachu from "../assets/imgs/loading.gif";

interface Props {
  name: string;
}

function PhotoLoader ({ name }: Props) {
  let imgEle: HTMLImageElement
  let loadInfoEle: HTMLDivElement
  let progressLoadedEle: HTMLDivElement
  let progressTextEle: HTMLDivElement

  axios
    .get(api.image(name), {
      responseType: 'arraybuffer',
      onDownloadProgress: function (progressEvent: { loaded: number, total: number }) {
        let percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total)
        if (loadInfoEle) {
          if (percentage >= 100) {
            setTimeout(() => loadInfoEle.classList.add('hide'), 200)
          } else {
            loadInfoEle.classList.remove('hide')
          }
        }
        if (progressLoadedEle) {
          progressLoadedEle.style.width = percentage + '%'
        }
        if (progressTextEle) {
          progressTextEle.textContent = percentage +'%'
        }
      }
    })
    .then(response => new Blob([response.data], {type: response.headers['content-type']}))
    .then(blob => {
      if (imgEle) {
        imgEle.src = URL.createObjectURL(blob)
      }
    })

  return (
    <div className="photo-loader">
      <img className="image" src={api.imageXs(name)} crossOrigin="anonymous" alt="" ref={c => imgEle = c as HTMLImageElement} />
      <div className="load-info" ref={c => loadInfoEle = c as HTMLDivElement}>
        <img className="loading" src={pikachu} alt="" />
        <div className="progress">
          <div className="loaded" ref={c => progressLoadedEle = c as HTMLDivElement}></div>
        </div>
        <div className="text" ref={c => progressTextEle = c as HTMLDivElement}>0%</div>
      </div>
    </div>
  )
}

export default PhotoLoader;
