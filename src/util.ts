export default T$

// Various utilities
var T$ = {
    docEl: document.documentElement,

    id: function(id) {
        return document.getElementById(id);
    },

    cls: function(klass, root) {
        return (root || document).getElementsByClassName(klass);
    },

    on: function(o, e, h) {
        o.addEventListener(e, h, false);
    },

    off: function(o, e, h) {
        o.removeEventListener(e, h, false);
    },

    el: function(name) {
        return document.createElement(name);
    },

    frag: function() {
        return document.createDocumentFragment();
    },

    extend: function(destination, source) {
        for (var key in source) {
            destination[key] = source[key];
        }
    },

    selectedOptions: function(el) {
        var i, opt, sel;

        if (el.selectedOptions) {
            return el.selectedOptions;
        }

        sel = [];

        for (i = 0; opt = el.options[i]; ++i) {
            if (opt.selected) {
                sel.push(opt);
            }
        }

        return sel;
    },

    copyCanvas: function(source) {
        var canvas = T$.el('canvas');
        canvas.width = source.width;
        canvas.height = source.height;
        canvas.getContext('2d').drawImage(source, 0, 0);
        return canvas;
    }
};