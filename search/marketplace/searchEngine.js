/**
 * Marketplace Search Engine 5.0
 * Keyword + Semantic Search
 */

export const MarketplaceSearchEngine = {
  keywordSearch(query, items) {
    return items.filter(i => i.title?.toLowerCase().includes(query.toLowerCase()));
  },

  tagSearch(tag, items) {
    return items.filter(i => i.tags?.includes(tag));
  },

  creatorSearch(creatorId, items) {
    return items.filter(i => i.creatorId === creatorId);
  },

  semanticSearch(query, graph) {
    return { results: [], query };
  },

  combinedSearch(query, data) {
    return {
      keyword: this.keywordSearch(query, data.items),
      semantic: this.semanticSearch(query, data.graph)
    };
  }
};