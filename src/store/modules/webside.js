import websideConfig from '@/common/constants/webside'

const webside = {
  state: {
    webside: websideConfig
  },
  getters: {
    webside: state => state.webside
  }
}

export default webside
