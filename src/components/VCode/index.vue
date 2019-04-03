<template>
  <div class="s-canvas">
    <canvas id="s-canvas"
            :width="contentWidth"
            :height="contentHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    identifyCode: {
      type: String,
      default: '1234'
    },
    fontSizeMin: {
      type: Number,
      default: 16
    },
    fontSizeMax: {
      type: Number,
      default: 40
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 180
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    contentWidth: {
      type: Number,
      default: 112
    },
    contentHeight: {
      type: Number,
      default: 38
    }
  },
  mounted () {
    this.drawPic()
  },
  watch: {
    identifyCode () {
      this.drawPic()
    }
  },
  methods: {
    drawPic () {
      var canvas = document.getElementById('s-canvas')
      var ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      /* 绘制背景 */
      ctx.fillStyle = this._randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      )
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      /* 绘制文字 */
      for (let i = 0; i < this.identifyCode.length; i++) {
        this._drawText(ctx, this.identifyCode[i], i)
      }
      /* 绘制干扰线 */
      this._drawLine(ctx)
      /* 绘制干扰点 */
      this._drawDot(ctx)
    },
    /* 生成一个随机数 */
    _randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    /* 生成随机颜色 */
    _randomColor (min, max) {
      var r = this._randomNum(min, max)
      var g = this._randomNum(min, max)
      var b = this._randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    /* 绘制文本 */
    _drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    /* 绘制干扰线 */
    _drawLine (ctx) {
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(
          this.lineColorMin,
          this.lineColorMax
        )
        ctx.beginPath()
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.stroke()
      }
    },
    /* 绘制干扰点 */
    _drawDot (ctx) {
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
