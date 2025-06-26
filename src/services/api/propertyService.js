import propertyData from '@/services/mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  async getAll() {
    await delay(300);
    return [...propertyData];
  }

  async getById(id) {
    await delay(200);
    const property = propertyData.find(p => p.Id === parseInt(id, 10));
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }

  async search(filters = {}) {
    await delay(400);
    let results = [...propertyData];

    if (filters.location) {
      const location = filters.location.toLowerCase();
      results = results.filter(p => 
        p.address.city.toLowerCase().includes(location) ||
        p.address.state.toLowerCase().includes(location) ||
        p.address.full.toLowerCase().includes(location) ||
        p.title.toLowerCase().includes(location)
      );
    }

    if (filters.priceMin !== undefined && filters.priceMin > 0) {
      results = results.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax !== undefined && filters.priceMax > 0) {
      results = results.filter(p => p.price <= filters.priceMax);
    }

    if (filters.bedroomsMin !== undefined && filters.bedroomsMin > 0) {
      results = results.filter(p => p.bedrooms >= filters.bedroomsMin);
    }

    if (filters.bathroomsMin !== undefined && filters.bathroomsMin > 0) {
      results = results.filter(p => p.bathrooms >= filters.bathroomsMin);
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      results = results.filter(p => filters.propertyType.includes(p.propertyType));
    }

    return results;
  }
}

export default new PropertyService();