import Brush from "./brush"

// Tegaki dodge
export default class Dodge extends Brush {
    public init() {
        this.size = 24
        this.alpha = 0.25
        this.alphaDamp = 0.05
        this.step = 0.25
        this.stepAcc = 0
    }

    public brushFn(x: any, y: any) {
        var i, a, aa, ctx, dest, data, len, kernel
    
        x = 0 | x
        y = 0 | y
        i = 0
        ctx = super.activeCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        len = kernel.length
        
        while (i < len) {
            aa = kernel[i + 3] * 0.3
            a = 1 + kernel[i + 3] / 255
            data[i] = data[i] * a + aa; ++i
            data[i] = data[i] * a + aa; ++i
            data[i] = data[i] * a + aa; ++i
            ++i
        }
        
        ctx.putImageData(dest, x, y)
    }
}
