class AnimationEngine {
    constructor() {
        this.animations = [];
    }

    add(animation) {
        this.animations.push(animation);
    }

    tick() {
        this.animations.forEach((a) => a.update && a.update());
    }
}
module.exports = AnimationEngine;
