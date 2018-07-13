import Bucket from "./bucket"
import T$ from "./util"

// Tegaki pencil
export default class Pencil extends Bucket {
    public init() {
        this.size = 8
        this.alpha = 1.0
        this.step = 0.25
        this.stepAcc = 0
    }

    public brushFn(x: any, y: any) {
        var i, ctx, dest, data, len, a, kernel

        x = 0 | x
        y = 0 | y
        i = 0
        ctx = super.ghostCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        len = kernel.length
        a = 0 | (this.alpha * 255)

        while (i < len) {
            data[i] = this.rgb[0]; ++i
            data[i] = this.rgb[1]; ++i
            data[i] = this.rgb[2]; ++i

            if (kernel[i] > 0) {
              data[i] = a
            }

            ++i
        }

        ctx.putImageData(dest, x, y)
    }

    public generate() {
        var brush, ctx, e, x, y, imageData, data, c, color, size, r, rr
        
        size = 0 | this.size
        r = 0 | ((size) / 2)
        rr = 0 | ((size + 1) % 2)
        brush = T$.el('canvas')
        brush.width = brush.height = size
        ctx = brush.getContext('2d')
        imageData = ctx.getImageData(0, 0, size, size)
        data = new Uint32Array(imageData.data.buffer)
        color = 0xFF000000
        x = r
        y = 0 | 0
        e = 1 - r
        c = r
        
        while (x >= y) {
            data[c + x - rr + (c + y - rr) * size] = color
            data[c + y - rr + (c + x - rr) * size] = color
            data[c - y + (c + x - rr) * size] = color
            data[c - x + (c + y - rr) * size] = color
            data[c - y + (c - x) * size] = color
            data[c - x + (c - y) * size] = color
            data[c + y - rr + (c - x) * size] = color
            data[c + x - rr + (c - y) * size] = color
            ++y
            
            if (e <= 0) {
                e += 2 * y + 1
            } else {
                x--
                e += 2 * (y - x) + 1
            }
        }
        
        if (r > 0) {
            super.fill(imageData, imageData, r, r, this.rgb, this.alpha)
        }
        
        this.center = r
        this.brushSize = size
        this.brush = brush
        this.kernel = imageData.data
    }
}
