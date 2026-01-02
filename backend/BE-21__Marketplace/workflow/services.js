// BE-21__Marketplace - workflow/services.js

const {
  emitServiceBooked,
  emitServiceCompleted,
} = require("../events/emitters");

async function bookService(data) {
  const result = await emitServiceBooked(data);
  return result;
}

async function completeService(data) {
  const result = await emitServiceCompleted(data);
  return result;
}

module.exports = {
  bookService,
  completeService,
};
