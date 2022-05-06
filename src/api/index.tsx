let URL = '.';

switch (process.env.NODE_ENV) {
  case 'development':
    URL = 'http://127.0.0.1:8080'
    break
  case 'production':
  default:
    break;
}

const APIS = {
  image: (name: string) => `${URL}/image/${name}`,
  imageXs: (name: string) => `${URL}/image-xs/${name}`,
  images: (lastPhotoName: string, amount: number) => `${URL}/images?fromName=${lastPhotoName}&amount=${amount}`,
  video: (name: string) => `${URL}/video/${name}`,
  videos: (lastVideoName: string) => `${URL}/videos?fromName=${lastVideoName}`,
  upload: `${URL}/upload`,
  delete: `${URL}/delete`
}

export default APIS;
