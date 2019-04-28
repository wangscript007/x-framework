<script>
import ImageIcon from '@/components/Icon/ImageIcon'
import SvgIcon from '@/components/Icon/SvgIcon'
import ClassIcon from '@/components/Icon/ClassIcon'

export default {
  name: 'Icon',
  components: {
    ImageIcon,
    SvgIcon,
    ClassIcon
  },
  props: {
    type: {
      type: String,
      default: 'svg'
    },
    icon: {
      type: String,
      required: true
    },
    styles: {
      type: Object,
      default: null
    }
  },
  // eslint-disable-next-line
  render: function (h) {
    return (this.type === 'class' ? <class-icon class='x-icon' icon={this.icon} styles={this.styles} /> : this.type === 'image' ? <image-icon class='x-icon' icon={this.icon} styles={this.styles} /> : <svg-icon class='x-icon' icon={this.icon} styles={this.styles} />)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
