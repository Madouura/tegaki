import Dodge from "./dodge"

// Tegaki blur
export default class Blur extends Dodge {
    public brushFn(x: any, y: any) {
        var i, j, ctx, src, size, srcData, dest, destData, lim, kernel, sx, sy, r, g, b, a, aa, acc, kx, ky
        
        x = 0 | x
        y = 0 | y
        size = this.brushSize
        ctx = super.activeCtx
        src = ctx.getImageData(x, y, size, size)
        srcData = src.data
        dest = ctx.createImageData(size, size)
        destData = dest.data
        kernel = this.kernel
        lim = size - 1
        
        for (sx = 0; sx < size; ++sx) {
            for (sy = 0; sy < size; ++sy) {
                r = g = b = a = acc = 0
                i = (sy * size + sx) * 4

                if (kernel[(sy * size + sx) * 4 + 3] === 0 || sx === 0 || sy === 0 || sx === lim || sy === lim) {
                    destData[i] = srcData[i]; ++i
                    destData[i] = srcData[i]; ++i
                    destData[i] = srcData[i]; ++i
                    destData[i] = srcData[i]
                    continue
                }

                for (kx = -1; kx < 2; ++kx) {
                    for (ky = -1; ky < 2; ++ky) {
                        j = ((sy - ky) * size + (sx - kx)) * 4
                        aa = srcData[j + 3]
                        acc += aa
                        r += srcData[j] * aa; ++j
                        g += srcData[j] * aa; ++j
                        b += srcData[j] * aa; ++j
                        a += srcData[j]
                    }
                }

                destData[i] = r / acc; ++i
                destData[i] = g / acc; ++i
                destData[i] = b / acc; ++i
                destData[i] = a / 9
            }
        }
        
        ctx.putImageData(dest, x, y)
    }
}
