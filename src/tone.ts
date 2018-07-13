import Pencil from "./pencil"

// Tegaki tone
export default class Tone extends Pencil {
    public data: any
    public dataAlpha: any
    public dataWidth: any
    public dataHeight: any
    
    public matrix: [
        [0 ,  8,  2, 10],
        [12,  4, 14,  6],
        [3 , 11,  1,  9],
        [15,  7, 13,  5]
    ]

    public init() {
        this.size = 8
        this.alpha = 0.5
        this.step = 0.25
        this.stepAcc = 0
    }
    
    public brushFn(x: any, y: any) {
        var ctx, dest, data, kernel, brushSize, map, px, mapWidth, mapHeight, xx, yy
        
        x = 0 | x
        y = 0 | y
        ctx = super.ghostCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        brushSize = this.brushSize
        mapWidth = super.canvas.width
        mapHeight = super.canvas.height
        map = this.generateTone(mapWidth, mapHeight)

        for (yy = 0; yy < brushSize; ++yy) {
            for (xx = 0; xx < brushSize; ++xx) {
                px = (brushSize * yy + xx) * 4
                
                if (kernel[px + 3] === 0) {
                    continue
                }
                
                if (map[(yy + y) * mapWidth + xx + x] === 0) {
                    data[px] = this.rgb[0]; ++px
                    data[px] = this.rgb[1]; ++px
                    data[px] = this.rgb[2]; ++px
                    data[px] = 255
                }
            }
        }
        
        ctx.putImageData(dest, x, y)
    }

    public generateTone(w: any, h: any) {
        var data, x, y, a
    
        if (this.alpha == this.dataAlpha && w === this.dataWidth && h === this.dataHeight) {
            return this.data
        }
        
        data = new Uint8Array(w * h)
        
        if (this.alpha <= 1.0) {
            a = this.alpha * 16 - 1
            
            for (y = 0; y < h; ++y) {
                for (x = 0; x < w; ++x) {
                    if (a < this.matrix[y % 4][x % 4]) {
                        data[w * y + x] = 1
                    }
                }
            }
        }
        
        this.dataAlpha = this.alpha
        this.dataWidth = w
        this.dataHeight = h
        this.data = data
        return data
    }
}
