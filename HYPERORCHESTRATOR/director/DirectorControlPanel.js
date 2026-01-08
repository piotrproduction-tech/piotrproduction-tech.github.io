class DirectorControlPanel {
    constructor({ director }) {
        this.director = director;
    }

    setProfile(name) {
        this.director.loadProfile(name);
    }
}
module.exports = DirectorControlPanel;
