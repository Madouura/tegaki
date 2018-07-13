export default T$

// Various utilities
var T$ = {
    docEl: document.documentElement,

    id: (id: any) => {
        return document.getElementById(id)
    },

    cls: (klass: any, root: any) => {
        return (root || document).getElementsByClassName(klass)
    },

    on: (o: any, e: any, h: any) => {
        o.addEventListener(e, h, false)
    },

    off: (o: any, e: any, h: any) => {
        o.removeEventListener(e, h, false)
    },

    el: (name: any) => {
        return document.createElement(name)
    },

    frag: () => {
        return document.createDocumentFragment()
    },

    extend: (destination: any, source: any) => {
        for (var key in source) {
            destination[key] = source[key]
        }
    },

    selectedOptions: (el: any) => {
        var i, opt, sel

        if (el.selectedOptions) {
            return el.selectedOptions
        }

        sel = []

        for (i = 0; opt = el.options[i]; ++i) {
            if (opt.selected) {
                sel.push(opt)
            }
        }

        return sel
    },

    copyCanvas: (source: any) => {
        var canvas = T$.el('canvas')
        canvas.width = source.width
        canvas.height = source.height
        
        canvas.getContext('2d').drawImage(source, 0, 0)
        return canvas
    }
}

export var Strings = {
    // Messages
    badDimensions: 'Invalid dimensions.',
    promptWidth: 'Canvas width in pixels',
    promptHeight: 'Canvas height in pixels',
    confirmDelLayers: 'Delete selected layers?',
    errorMergeOneLayer: 'You need to select at least 2 layers.',
    confirmMergeLayers: 'Merge selected layers?',
    errorLoadImage: 'Could not load the image.',
    noActiveLayer: 'No active layer.',
    hiddenActiveLayer: 'The active layer is not visible.',
    confirmCancel: 'Are you sure? Your work will be lost.',
    confirmChangeCanvas: 'Changing the canvas will clear all layers and history.',

    // UI
    color: 'Color',
    size: 'Size',
    alpha: 'Opacity',
    zoom: 'Zoom',
    layers: 'Layers',
    addLayer: 'Add layer',
    delLayers: 'Delete layers',
    mergeLayers: 'Merge layers',
    showHideLayer: 'Toggle visibility',
    moveLayerUp: 'Move up',
    moveLayerDown: 'Move down',
    tool: 'Tool',
    changeCanvas: 'Change canvas',
    blank: 'Blank',
    newCanvas: 'New',
    undo: 'Undo',
    redo: 'Redo',
    close: 'Close',
    finish: 'Finish',

    // Tools
    pen: 'Pen',
    pencil: 'Pencil',
    airbrush: 'Airbrush',
    pipette: 'Pipette',
    dodge: 'Dodge',
    burn: 'Burn',
    blur: 'Blur',
    eraser: 'Eraser',
    bucket: 'Bucket',
    tone: 'Tone'
}
