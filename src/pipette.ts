import Tegaki from "./main"

// Tegaki pipette
export default class Pipette extends Tegaki {
    public size: 1
    public alpha: 1
    public noCursor: true

    public draw(posX: any, posY: any) {
        var c, ctx

        // TODO: lol what?
        if (true) {
            ctx = super.flatten(ctx).getContext('2d')
        } else {
            ctx = super.activeCtx
        }

        c = super.getColorAt(ctx, posX, posY)

        super.setToolColor(c)
        super.updateUI('color')
    }
}
