import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import ApperIcon from '@/components/ApperIcon';
import favoriteService from '@/services/api/favoriteService';

const Favorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await favoriteService.getFavoriteProperties();
      setFavoriteProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load favorites');
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadFavorites();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Failed to Load Favorites
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

  if (favoriteProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Heart" size={48} className="text-gray-300 mx-auto mb-4" />
          </motion.div>
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            No Favorite Properties Yet
          </Text>
          <Text color="gray-600" className="mb-6">
            Start browsing properties and save your favorites to see them here
          </Text>
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" icon="Search">
                Browse Properties
              </Button>
            </motion.div>
          </Link>
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
            Your Favorite Properties
          </Text>
          <Text color="gray-600">
            Properties you've saved for later viewing
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <Text size="sm" color="gray-600">
            {favoriteProperties.length} favorite{favoriteProperties.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </motion.div>

      {/* Favorites Grid */}
      <PropertyGrid properties={favoriteProperties} />

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Text color="gray-600" className="mb-4">
          Looking for more properties?
        </Text>
        <Link to="/">
          <Button variant="outline" icon="Search">
            Browse All Properties
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Favorites;