import Tegaki from "./main"
import T$ from "./util"

// Tegaki history
export default class History {
    public maxSize: 10
    public undoStack: any[]
    public redoStack: any[]
    public pendingAction: any

    public clear() {
        this.undoStack = []
        this.redoStack = []
        this.pendingAction = null
    }

    public push(action: any) {
        this.undoStack.push(action)
    
        if (this.undoStack.length > this.maxSize) {
            this.undoStack.shift()
        }
        
        if (this.redoStack.length > 0) {
            this.redoStack = []
        }
    }

    public undo() {
        var action
    
        if (!this.undoStack.length) {
            return
        }
        
        action = this.undoStack.pop()

        action.undo()
        this.redoStack.push(action)
    }

    public redo() {
        var action

        if (!this.redoStack.length) {
            return
        }
        
        action = this.redoStack.pop()

        action.redo()
        this.undoStack.push(action)
    }
}

// Tegaki history actions
export class HistoryActions extends Tegaki {
    public canvasBefore: any
    public canvasAfter: any
    public layerId: any
    public indices: any
    public layers: any
    public up: any

    public draw(layerId: any) {
        this.canvasBefore = null
        this.canvasAfter = null
        this.layerId = layerId

        this.draw.prototype.addCanvasState = (canvas: any, type: any) => {
            if (type) {
                this.canvasAfter = T$.copyCanvas(canvas)
            } else {
                this.canvasBefore = T$.copyCanvas(canvas)
            }
        }

        this.draw.prototype.exec = (type: any) => {
            var i, layer
            
            for (i in super.layers) {
                layer = super.layers[i]
                
                if (layer.id === this.layerId) {
                    layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height)
                    layer.ctx.drawImage(type ? this.canvasAfter: this.canvasBefore, 0, 0)
                }
            }
        }

        this.draw.prototype.undo = () => {
            this.draw.prototype.exec(0)
        }

        this.draw.prototype.redo = () => {
            this.draw.prototype.exec(1)
        }
    }

    public destroyLayers(indices: any, layers: any) {
        this.indices = indices
        this.layers = layers
        this.canvasBefore = null
        this.canvasAfter = null
        this.layerId = null

        this.destroyLayers.prototype.undo = () => {
            var i, ii, len, layers, idx, layer, frag

            layers = new Array(len)
            
            for (i = 0; (idx = this.indices[i]) !== undefined; ++i) {
                layers[idx] = this.layers[i]
            }
            
            i = ii = 0
            len = super.layers.length + this.layers.length
            frag = T$.frag()
            
            while (i < len) {
                if (!layers[i]) {
                    layer = layers[i] = super.layers[ii]
                    super.layersCnt.removeChild(layer.canvas)
                    ++ii
                }
                
                if (this.layerId && layer.id === this.layerId) {
                    layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height)
                    layer.ctx.drawImage(this.canvasBefore, 0, 0)
                }
                
                frag.appendChild(layers[i].canvas)
                ++i
            }
            
            super.layersCnt.insertBefore(frag, super.canvas.nextElementSibling)
            
            super.layers = layers
            
            super.setActiveLayer(null)
            super.rebuildLayerCtrl()
        }

        this.destroyLayers.prototype.redo = () => {
            var i, layer, ids = []
  
            for (i = 0; layer = this.layers[i]; ++i) {
                ids.push(layer.id)
            }
            
            if (this.layerId) {
                ids.push(this.layerId)
                super.mergeLayers(ids)
            } else {
                super.deleteLayers(ids)
            }
        }
    }

    public addLayer(layerId: any) {
        this.layerId = layerId

        this.addLayer.prototype.undo = () => {
            super.deleteLayers([this.layerId])
            super.layerIndex--
        }

        this.addLayer.prototype.redo = () => {
            super.addLayer(null)
            super.setActiveLayer(null)
        }
    }

    public moveLayer(layerId: any, up: any) {
        this.layerId = layerId
        this.up = up

        this.moveLayer.prototype.undo = () => {
            super.setActiveLayer(this.layerId)
            super.moveLayer(this.layerId, !this.up)
        }

        this.moveLayer.prototype.redo = () => {
            super.setActiveLayer(this.layerId)
            super.moveLayer(this.layerId, this.up)
        }
    }
}
