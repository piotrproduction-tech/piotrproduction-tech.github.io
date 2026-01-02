


// LIFE_AWARDS_SYNC
// Sync layer for awards workflow

import {
  listAwardCategoriesWorkflow,
  createAwardCategoryWorkflow,
  grantAwardWorkflow
} from "../workflow/awards";

export const awardsSync = {
  list(globalState) {
    return listAwardCategoriesWorkflow(globalState);
  },
  createCategory(globalState, payload) {
    return createAwardCategoryWorkflow(globalState, payload);
  },
  grant(globalState, payload) {
    return grantAwardWorkflow(globalState, payload);
  }
};
