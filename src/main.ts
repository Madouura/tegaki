import Pencil from "./pencil"
import Pen from "./pen"
import Airbrush from "./airbrush"
import Bucket from "./bucket"
import Tone from "./tone"
import Pipette from "./pipette"
import Dodge from "./dodge"
import Burn from "./burn"
import Blur from "./blur"
import Eraser from "./eraser"
import T$, { Strings } from "./util"

// Tegaki
export default class Tegaki {
    public bg: any
    public cnt: any
    public canvas: any
    public ctx: any
    public layers: any[]
    public layersCnt: any
    public cursorCanvas: any
    public cursorCtx: any
    public ghostCanvas: any
    public ghostCtx: any
    public flatCtx: any
    public activeCtx: any
    public activeLayer: any
    public layerIndex: any
    public isPainting: false
    public isErasing: false
    public isColorPicking: false
    public offsetX: 0
    public offsetY: 0
    public zoomLevel: 1
    public zoomMax: 4
    public zoomMin: 1
    public TWOPI: 6.28318
    public tool: any
    public toolColor: '#000000'
    public bgColor: '#ffffff'
    public maxSize: 32
    public maxLayers: 25
    public baseWidth: any
    public baseHeight: any
    public onDoneCb: any
    public onCancelCb: any

    public tools: {
        pencil: Pencil,
        pen: Pen,
        airbrush: Airbrush,
        bucket: Bucket,
        tone: Tone,
        pipette: Pipette,
        dodge: Dodge,
        burn: Burn,
        blur: Blur,
        eraser: Eraser
    }

    public clearCtx(ctx: any) {

    }

    public hexToRgb(color: any) {
        
    }

    public flatten(ctx: any) {
        var i, layer, canvas

        if (!ctx) {
            canvas = T$.el('canvas')
            ctx = canvas.getContext('2d')
        } else {
            canvas = ctx.canvas
        }

        canvas.width = this.canvas.width
        canvas.height = this.canvas.height

        ctx.drawImage(this.canvas, 0, 0)

        for (i = 0; layer = this.layers[i]; ++i) {
            if (layer.canvas.classList.contains('tegaki-hidden')) {
                continue
            }

            ctx.drawImage(layer.canvas, 0, 0)
            return canvas
        }
    }

    public getColorAt(ctx: any, posX: any, posY: any) {

    }

    public setToolColor(c: any) {

    }

    public updateUI(c: any) {
        
    }

    public setActiveLayer(id: any) {

    }

    public rebuildLayerCtrl() {

    }

    public mergeLayers(ids: any) {

    }

    public deleteLayers(ids: any) {
        
    }

    public addLayer(id: any) {
        
    }

    public moveLayer(id: any, up: any) {
        
    }
}
