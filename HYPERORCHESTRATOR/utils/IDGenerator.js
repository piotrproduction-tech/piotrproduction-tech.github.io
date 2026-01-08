let counter = 0;

module.exports = {
    next: (prefix = "id") => `${prefix}_${++counter}`
};
