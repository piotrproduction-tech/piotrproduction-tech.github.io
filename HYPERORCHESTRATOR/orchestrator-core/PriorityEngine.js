class PriorityEngine {
    evaluate(event) {
        return event.priority || 0;
    }
}
module.exports = PriorityEngine;
