// BE-21__Marketplace - workflow/transactions.js

const {
  emitTransactionStarted,
  emitTransactionCompleted,
  emitTransactionFailed,
} = require("../events/emitters");

async function startTransaction(data) {
  const result = await emitTransactionStarted(data);
  return result;
}

async function completeTransaction(data) {
  const result = await emitTransactionCompleted(data);
  return result;
}

async function failTransaction(data) {
  const result = await emitTransactionFailed(data);
  return result;
}

module.exports = {
  startTransaction,
  completeTransaction,
  failTransaction,
};
