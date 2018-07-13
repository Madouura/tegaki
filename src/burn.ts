import Dodge from "./dodge"

// Tegaki burn
export default class Burn extends Dodge {
    public brushFn(x: any, y: any) {
        var i, a, ctx, dest, data, len, kernel
    
        x = 0 | x
        y = 0 | y
        i = 0
        ctx = super.activeCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        len = kernel.length
        
        while (i < len) {
            a = 1 - kernel[i + 3] / 255
            data[i] = data[i] * a; ++i
            data[i] = data[i] * a; ++i
            data[i] = data[i] * a; ++i
            ++i
        }
        
        ctx.putImageData(dest, x, y)
    }
}
