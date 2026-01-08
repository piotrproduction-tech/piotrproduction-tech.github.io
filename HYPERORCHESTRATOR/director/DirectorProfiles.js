class DirectorProfiles {
    constructor() {
        this.profiles = new Map();
    }

    register(name, profile) {
        this.profiles.set(name, profile);
    }

    get(name) {
        return this.profiles.get(name);
    }
}
module.exports = DirectorProfiles;
