let URL = '.';

switch (process.env.NODE_ENV) {
  case 'development':
    URL = 'http://127.0.0.1:8080'
    break
  case 'production':
  default:
    break;
}

export default {
  image: (name: string) => `${URL}/image/${name}`,
  images: `${URL}/images`,
  upload: `${URL}/upload`
}