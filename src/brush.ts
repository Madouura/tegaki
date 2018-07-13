import Tegaki from "./main"
import T$ from "./util"

// Tegaki brush
export default class Brush extends Tegaki {
    public brush
    public brushSize
    public rgb
    public kernel
    public center
    public step
    public stepSize
    public stepAcc
    public posX
    public posY
    public size
    public alpha
    public alphaDamp

    constructor(x, y) {
        super()
        var i, ctx, dest, data, len, kernel

        x = 0 | x
        y = 0 | y
        i = 0
        ctx = super.ghostCtx
        dest = ctx.getImageData(x, y, this.brushSize, this.brushSize)
        data = dest.data
        kernel = this.kernel
        len = kernel.length

        while (i < len) {
            data[i] = this.rgb[0]; ++i
            data[i] = this.rgb[1]; ++i
            data[i] = this.rgb[2]; ++i
            data[i] += kernel[i] * (1.0 - data[i] / 255); ++i
        }

        ctx.putImageData(dest, x, y)
    }

    public commit() {
        super.activeCtx.drawImage(super.ghostCanvas, 0, 0)
        super.clearCtx(super.ghostCtx)
    }

    public draw(posX, posY, pt) {
        var offset, mx, my, fromX, fromY, dx, dy, err, derr, step, stepAcc

        offset = this.center
        step = this.stepSize
        stepAcc = this.stepAcc

        if (pt === true) {
            this.stepAcc = 0
            this.posX = posX
            this.posY = posY
            this.constructor(posX - offset, posY - offset)
            return
        }

        fromX = this.posX
        fromY = this.posY

        if (fromX < posX) {
            dx = posX - fromX
            mx = 1
        } else {
            dx = fromX - posX
            mx = -1
        }

        if (fromY < posY) {
            dy = posY - fromY
            my = 1
        } else {
            dy = fromY - posY
            my = -1
        }

        err = (dx > dy ? dx : -dy) / 2
        dx = -dx

        while (true) {
            ++stepAcc

            if (stepAcc > step) {
                this.constructor(fromX - offset, fromY - offset)
                stepAcc = 0
            }

            if (fromX === posX && fromY === posY) {
                break
            }

            derr = err

            if (derr > dx) {
                err -= dy
                fromX += mx
            }

            if (derr < dy) {
                err -= dx
                fromY += my
            }
        }

        this.stepAcc = stepAcc
        this.posX = posX
        this.posY = posY
    }

    public generate() {
        var i, size, r, brush, ctx, dest, data, len, sqd, sqlen, hs, col, row, ecol, erow, a

        i = 0
        size = this.size * 2
        r = size / 2
        brush = T$.el('canvas')
        brush.width = brush.height = size
        ctx = brush.getContext('2d')
        dest = ctx.getImageData(0, 0, size, size)
        data = dest.data
        len = size * size * 4
        sqlen = Math.sqrt(r * r)
        hs = Math.round(r)
        col = row = -hs

        while (i < len) {
            if (col >= hs) {
                col = -hs
                ++row
                continue
            }

            ecol = col
            erow = row

            if (ecol < 0) {
                ecol = -ecol
            }

            if (erow < 0) {
                erow = -erow
            }

            sqd = Math.sqrt(ecol * ecol + erow * erow)

            if (sqd > sqlen) {
                a = 0
            } else {
                a = sqd / sqlen
                a = (Math.exp(1 - 1 / a) / a)
                a = 255 - ((0 | (a * 100 + 0.5)) / 100) * 255
            }

            if (this.alphaDamp) {
                a *= this.alpha * this.alphaDamp
            } else {
                a *= this.alpha
            }

            data[i + 3] = a
            i += 4
            ++col
        }

        ctx.putImageData(dest, 0, 0)
        this.center = r
        this.brushSize = size
        this.brush = brush
        this.kernel = data
    }

    public setSize(size, noBrush) {
        this.size = size

        if (!noBrush) {
            this.generate()
        }

        this.stepSize = Math.floor(this.size * this.step)
    }

    public setAlpha(alpha, noBrush) {
        this.alpha = alpha

        if (!noBrush) {
            this.generate()
        }
    }

    public setColor(color, noBrush) {
        this.rgb = super.hexToRgb(color)

        if (!noBrush) {
            this.generate()
        }
    }

    public set() {
        this.setAlpha(this.alpha, true)
        this.setSize(this.size, true)
        this.setColor(super.toolColor, true)
        this.generate()
    }
}