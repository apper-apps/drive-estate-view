import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import FilterSidebar from '@/components/molecules/FilterSidebar';
import ApperIcon from '@/components/ApperIcon';
import propertyService from '@/services/api/propertyService';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    priceMin: 0,
    priceMax: 0,
    bedroomsMin: 0,
    bathroomsMin: 0,
    propertyType: []
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (searchFilters = filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.search(searchFilters);
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    loadProperties(newFilters);
  };

  const handleRetry = () => {
    loadProperties();
  };

  if (error && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Oops! Something went wrong
          </Text>
          <Text color="gray-600" className="mb-6">
            {error}
          </Text>
          <Button variant="secondary" onClick={handleRetry}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!loading && properties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="Home" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            No properties found
          </Text>
          <Text color="gray-600" className="mb-6">
            Try adjusting your search filters to find more properties
          </Text>
          <Button 
            variant="secondary" 
            onClick={() => setShowFilters(true)}
            icon="Filter"
          >
            Adjust Filters
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <Text variant="heading" size="3xl" weight="semibold" color="primary" className="mb-2">
            Featured Properties
          </Text>
          <Text color="gray-600">
            Discover your perfect home from our curated selection
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <Text size="sm" color="gray-600">
            {loading ? 'Loading...' : `${properties.length} properties found`}
          </Text>
          
          <Button
            variant="outline"
            icon="Filter"
            onClick={() => setShowFilters(true)}
            className="md:hidden"
          >
            Filters
          </Button>
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={true}
            />
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={() => setShowFilters(false)}
          isOpen={showFilters}
        />

        {/* Property Grid */}
        <div className="flex-1 min-w-0">
          <PropertyGrid properties={properties} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Properties;