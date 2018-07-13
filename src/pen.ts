import Brush from "./brush"
import T$ from "./util"

// Tegaki pen
export default class Pen extends Brush {
    public init() {
        this.size = 8
        this.alpha = 0.5
        this.step = 0.1
        this.stepAcc = 0
    }

    public generate() {
        var size, r, brush, ctx

        size = this.size
        r = size / 2
        brush = T$.el('canvas')
        brush.width = brush.height = size
        ctx = brush.getContext('2d')
        ctx.globalAlpha = this.alpha

        ctx.beginPath()
        ctx.arc(r, r, r, 0, super.TWOPI, false)
        
        ctx.fillStyle = '#000000'

        ctx.fill()
        ctx.closePath()

        this.center = r
        this.brushSize = size
        this.brush = brush
        this.kernel = ctx.getImageData(0, 0, this.brushSize, this.brushSize).data
    }
}
