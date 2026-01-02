export const festivalAwardsWorkflow = {
  createAwardCategory(name, description) {
    return {
      id: "award_" + Date.now(),
      name,
      description,
      createdAt: Date.now()
    };
  },
  grantAward(categoryId, submissionId) {
    return {
      categoryId,
      submissionId,
      grantedAt: Date.now()
    };
  }
};


// WF_AWARDS_CORE
// Core workflow for award categories and granting awards

export function listAwardCategoriesWorkflow(globalState) {
  const cats = globalState.festival?.awardCategories || [];
  return { categories: cats };
}

export function createAwardCategoryWorkflow(globalState, { name, description }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.awardCategories = globalState.festival.awardCategories || [];

  const category = {
    id: "awardcat_" + Date.now(),
    name,
    description,
    createdAt: Date.now()
  };

  globalState.festival.awardCategories.push(category);

  return {
    category,
    events: [
      {
        type: "FESTIVAL_AWARD_CATEGORY_CREATED",
        categoryId: category.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function grantAwardWorkflow(globalState, { categoryId, submissionId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.awards = globalState.festival.awards || [];

  const award = {
    id: "award_" + Date.now(),
    categoryId,
    submissionId,
    grantedAt: Date.now()
  };

  globalState.festival.awards.push(award);

  return {
    award,
    events: [
      {
        type: "FESTIVAL_AWARD_GRANTED",
        categoryId,
        submissionId,
        timestamp: Date.now()
      }
    ]
  };
}
