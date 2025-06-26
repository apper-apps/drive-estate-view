import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';
import favoriteService from '@/services/api/favoriteService';

const PropertyCard = ({ property, showFavorite = true }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorite = await favoriteService.isFavorite(property.Id);
        setIsFavorite(favorite);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavorite();
  }, [property.Id]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      if (isFavorite) {
        await favoriteService.remove(property.Id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.add(property.Id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/property/${property.Id}`}>
        <Card hover padding="none" className="overflow-hidden">
          {/* Property Image */}
          <div className="relative h-48 md:h-56">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Price Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" size="lg" className="shadow-lg">
                {formatPrice(property.price)}
              </Badge>
            </div>

            {/* Favorite Button */}
            {showFavorite && (
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteToggle}
                  loading={loading}
                  className="bg-white/90 hover:bg-white rounded-full p-2"
                >
                  <motion.div
                    animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ApperIcon
                      name="Heart"
                      size={20}
                      className={isFavorite ? 'text-error fill-current' : 'text-gray-600'}
                    />
                  </motion.div>
                </Button>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <Text variant="heading" size="lg" weight="semibold" className="line-clamp-1">
                {property.title}
              </Text>
              <Badge variant="default" className="ml-2 flex-shrink-0">
                {property.propertyType}
              </Badge>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <ApperIcon name="MapPin" size={16} className="mr-1" />
              <Text size="sm" className="line-clamp-1">
                {property.address.full}
              </Text>
            </div>

            {/* Property Stats */}
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1" />
                <Text size="sm">{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</Text>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1" />
                <Text size="sm">{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</Text>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Home" size={16} className="mr-1" />
                <Text size="sm">{property.squareFeet.toLocaleString()} sq ft</Text>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;