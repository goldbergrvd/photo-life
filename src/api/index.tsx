import axios from "axios";
import { isImage, isVideo } from "../constants";
import { Album } from "../types";

let URL = '.';

const JSON_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
}

switch (process.env.NODE_ENV) {
  case 'development':
    URL = 'http://127.0.0.1:8080'
    break
  case 'production':
  default:
    break;
}

function createAlbum(data: any): Album {
  return {
    id: data.id,
    name: data.name,
    photoList: data.photoList.map((photoName: string) => ({
      name: photoName,
      browsed: false,
      selected: false
    })),
    browsing: false,
    willDelete: false
  }
}

export const APIS = Object.freeze({
  image: (name: string) => `${URL}/image/${name}`,
  imageXs: (name: string) => `${URL}/image-xs/${name}`,
  images: (lastPhotoName: string, amount: number) => `${URL}/images?fromName=${lastPhotoName}&amount=${amount}`,
  video: (name: string) => `${URL}/video/${name}`,
  videos: (lastVideoName: string) => `${URL}/videos?fromName=${lastVideoName}`,
  upload: `${URL}/upload`,
  delete: `${URL}/delete`,
  albums: `${URL}/albums`,
  addAlbum: `${URL}/album`,
  deleteAlbum: (id: string) => `${URL}/album/${id}`,
  addAlbumPhoto: (id: string) => `${URL}/album/addphoto/${id}`,
  deleteAlbumPhoto: (id: string) => `${URL}/album/deletephoto/${id}`,
})

export const REQUESTS = Object.freeze({
  image: (name: string) => axios.get(APIS.image(name)),
  imageXs: (name: string) => axios.get(APIS.imageXs(name)),
  images: (lastPhotoName: string, amount: number) => (
    axios.get(APIS.images(lastPhotoName, amount))
    .then(res => res.data)
  ),
  video: (name: string) => axios.get(APIS.video(name)),
  videos: (lastVideoName: string) => (
    axios.get(APIS.videos(lastVideoName))
    .then(res => res.data)
  ),
  upload: (formData: FormData, uploadProgressUpdator: (progress: number) => void) => (
    axios.post(APIS.upload, formData, {
        onUploadProgress: (evt: ProgressEvent) => {
          const progress = Math.floor((evt.loaded * 100) / evt.total);
          uploadProgressUpdator(progress)
        }
      })
    .then(res => {
      let result = res.data.successResults.reduce((acc: {photos: string[], videos: string[]}, d: string) => {
        if (isImage(d)) {
          acc.photos.push(d)
        }
        if (isVideo(d)) {
          acc.videos.push(d)
        }
        return acc
      }, { photos: [], videos: [] })

      result.errorFiles = res.data.errorFiles
      return result
    })
  ),
  delete: (names: string[]) => (
    axios.delete(APIS.delete, {
      headers: { 'Content-Type': 'application/json' },
      data: names
    })
    .then(res => {
      let deletedPhotosMap = new Map<string, boolean>()
      let deletedVideosMap = new Map<string, boolean>()

      for (let [k, v] of Object.entries(res.data)) {
        if (isImage(k)) {
          deletedPhotosMap.set(k, v as boolean)
        }
        if (isVideo(k)) {
          deletedVideosMap.set(k, v as boolean)
        }
      }
      return {
        deletedPhotosMap,
        deletedVideosMap
      }
    })
  ),
  albums: () => (
    axios.get(APIS.albums)
    .then(res => res.data.map(createAlbum))
  ),
  addAlbum: (name: string, photoList?: string[]) => (
    axios.post(APIS.addAlbum, { name, photoList }, JSON_CONFIG)
    .then(res => createAlbum(res.data))
  ),
  deleteAlbum: (id: string) => (
    axios.delete(APIS.deleteAlbum(id))
    .then(res => res.data + '')
  ),
  addAlbumPhoto: (id: string, photoNames: string[], uploadProgressUpdator: (progress: number) => void) => (
    axios.put(APIS.addAlbumPhoto(id), photoNames, {
      ...JSON_CONFIG,
      onUploadProgress: (evt: ProgressEvent) => {
        const progress = Math.floor((evt.loaded * 100) / evt.total);
        uploadProgressUpdator(progress)
      }
    })
    .then(res => createAlbum(res.data))
  ),
  deleteAlbumPhoto: (id: string, photoNames: string[]) => (
    axios.put(APIS.deleteAlbumPhoto(id), photoNames, JSON_CONFIG)
    .then(res => createAlbum(res.data))
  )
})

export default REQUESTS;
