import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vuejs-f29e2.firebaseio.com'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
