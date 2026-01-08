class VisualPriorityEngine {
    evaluate(event) {
        return event.priority || 0;
    }
}
module.exports = VisualPriorityEngine;
