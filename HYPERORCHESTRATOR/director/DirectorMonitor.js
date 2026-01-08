class DirectorMonitor {
    constructor() {
        this.lastDecision = null;
    }

    update(decision) {
        this.lastDecision = decision;
    }
}
module.exports = DirectorMonitor;
