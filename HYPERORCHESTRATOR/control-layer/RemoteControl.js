class RemoteControl {
    constructor({ orchestrator }) {
        this.orchestrator = orchestrator;
    }

    sendCommand(command) {
        this.orchestrator.dispatch(command);
    }
}
module.exports = RemoteControl;
