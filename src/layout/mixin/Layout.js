import { mapGetters } from 'vuex'
import screen from '@/common/constants/screen'

export default {
  data () {
    return {
      screen
    }
  },
  computed: {
    ...mapGetters(['app'])
  }
}
