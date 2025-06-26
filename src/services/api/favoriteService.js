import favoriteData from '@/services/mockData/favorites.json';
import propertyService from './propertyService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FavoriteService {
  constructor() {
    this.favorites = [...favoriteData];
  }

  async getAll() {
    await delay(250);
    return [...this.favorites];
  }

  async getFavoriteProperties() {
    await delay(300);
    const favoriteIds = this.favorites.map(f => f.propertyId);
    const allProperties = await propertyService.getAll();
    return allProperties.filter(p => favoriteIds.includes(p.Id));
  }

  async add(propertyId) {
    await delay(200);
    const existingFavorite = this.favorites.find(f => f.propertyId === parseInt(propertyId, 10));
    if (existingFavorite) {
      return { ...existingFavorite };
    }

    const newId = Math.max(...this.favorites.map(f => f.Id), 0) + 1;
    const newFavorite = {
      Id: newId,
      propertyId: parseInt(propertyId, 10),
      addedDate: new Date().toISOString()
    };

    this.favorites.push(newFavorite);
    return { ...newFavorite };
  }

  async remove(propertyId) {
    await delay(200);
    const index = this.favorites.findIndex(f => f.propertyId === parseInt(propertyId, 10));
    if (index === -1) {
      throw new Error('Favorite not found');
    }

    const removed = this.favorites.splice(index, 1)[0];
    return { ...removed };
  }

  async isFavorite(propertyId) {
    await delay(100);
    return this.favorites.some(f => f.propertyId === parseInt(propertyId, 10));
  }
}

export default new FavoriteService();