import axios from "axios";

let URL = '.';

switch (process.env.NODE_ENV) {
  case 'development':
    URL = 'http://127.0.0.1:8080'
    break
  case 'production':
  default:
    break;
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
  images: (lastPhotoName: string, amount: number) => axios.get(APIS.images(lastPhotoName, amount)),
  video: (name: string) => axios.get(APIS.video(name)),
  videos: (lastVideoName: string) => axios.get(APIS.videos(lastVideoName)),
  upload: (formData: FormData, onUploadProgress: (progressEvent: { loaded: number; total: number; }) => void) => axios.post(APIS.upload, formData, { onUploadProgress }),
  delete: (names: string[]) => axios.delete(APIS.delete, {
    headers: { 'Content-Type': 'application/json' },
    data: names
  }),
  albums: () => axios.get(APIS.albums),
  addAlbum: () => axios.post(APIS.addAlbum),
  deleteAlbum: (id: string) => axios.delete(APIS.deleteAlbum(id)),
  addAlbumPhoto: (id: string, photoNames: string[]) => axios.put(APIS.addAlbumPhoto(id), {
    headers: { 'Content-Type': 'application/json' },
    data: photoNames
  }),
  deleteAlbumPhoto: (id: string, photoNames: string[]) => axios.put(APIS.deleteAlbumPhoto(id), {
    headers: { 'Content-Type': 'application/json' },
    data: photoNames
  })
})

export default REQUESTS;
