import Brush from "./brush"

// Tegaki airbrush
export default class Airbrush extends Brush {
    public init() {
        this.size = 32
        this.alpha = 0.5
        this.alphaDamp = 0.2
        this.step = 0.25
        this.stepAcc = 0
    }
}
