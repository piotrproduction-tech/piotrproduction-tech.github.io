// BE-21__Marketplace - workflow/categories.js

const {
  emitCategoryCreated,
  emitCategoryUpdated,
  emitCategoryDeleted,
} = require("../events/emitters");

async function createCategory(data) {
  const result = await emitCategoryCreated(data);
  return result;
}

async function updateCategory(data) {
  const result = await emitCategoryUpdated(data);
  return result;
}

async function deleteCategory(data) {
  const result = await emitCategoryDeleted(data);
  return result;
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
