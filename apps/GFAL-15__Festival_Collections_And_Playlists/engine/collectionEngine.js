import { Collection } from "../models/collection.js";
import { PlaylistItem } from "../models/playlistItem.js";

export class CollectionEngine {
  constructor({ collectionRepository }) {
    this.collectionRepository = collectionRepository;
  }

  createCollection({ userId, title, description, isPublic }) {
    const collection = new Collection({
      id: this.collectionRepository.generateId(),
      userId,
      title,
      description,
      items: [],
      isPublic
    });

    this.collectionRepository.saveCollection(collection);
    return collection;
  }

  addItemToCollection(collectionId, itemData) {
    const collection = this.collectionRepository.getCollection(collectionId);
    if (!collection) throw new Error("Collection not found");

    const item = new PlaylistItem(itemData);
    collection.items.push(item);

    // sort by order
    collection.items.sort((a, b) => a.order - b.order);

    this.collectionRepository.saveCollection(collection);
    return collection;
  }

  removeItemFromCollection(collectionId, index) {
    const collection = this.collectionRepository.getCollection(collectionId);
    if (!collection) throw new Error("Collection not found");

    collection.items.splice(index, 1);
    this.collectionRepository.saveCollection(collection);

    return collection;
  }

  getCollectionsForUser(userId) {
    return this.collectionRepository.getCollectionsByUser(userId);
  }

  getPublicCollections() {
    return this.collectionRepository.getPublicCollections();
  }
}