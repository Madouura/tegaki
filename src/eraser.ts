import Pen from "./pen"

// Tegaki eraser
export default class Eraser extends Pen {
    public init() {
        this.size = 8
        this.alpha = 1.0
        this.step = 0.25
        this.stepAcc = 0
    }

    public brushFn(x: any, y: any) {
        var i, ctx, dest, data, len, kernel
    
        x = 0 | x
        y = 0 | y
        ctx = super.activeCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        len = kernel.length
        
        for (i = 3; i < len; i += 4) {
            if (kernel[i] > 0) {
                data[i] = 0
            }
        }
        
        ctx.putImageData(dest, x, y)
    }
}
