import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import PhotoGallery from '@/components/molecules/PhotoGallery';
import PropertyStats from '@/components/molecules/PropertyStats';
import ContactForm from '@/components/molecules/ContactForm';
import ApperIcon from '@/components/ApperIcon';
import propertyService from '@/services/api/propertyService';
import favoriteService from '@/services/api/favoriteService';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
      
      // Check favorite status
      const favorite = await favoriteService.isFavorite(id);
      setIsFavorite(favorite);
    } catch (err) {
      setError(err.message || 'Property not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    setFavoriteLoading(true);
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
      setFavoriteLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 rounded-card"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="Home" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Property Not Found
          </Text>
          <Text color="gray-600" className="mb-6">
            The property you're looking for doesn't exist or has been removed.
          </Text>
          <Link to="/">
            <Button variant="secondary">
              Back to Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <Link 
          to="/" 
          className="text-accent hover:text-blue-700 transition-colors"
        >
          <Text size="sm">Properties</Text>
        </Link>
        <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
        <Text size="sm" color="gray-600" className="line-clamp-1">
          {property.title}
        </Text>
      </motion.div>

      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8"
      >
        <div className="flex-1 min-w-0">
          <Text variant="heading" size="3xl" weight="semibold" color="primary" className="mb-2">
            {property.title}
          </Text>
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="MapPin" size={18} className="text-gray-500" />
            <Text color="gray-600">{property.address.full}</Text>
          </div>
          <div className="flex items-center gap-4">
            <Text variant="heading" size="2xl" weight="bold" color="secondary">
              {formatPrice(property.price)}
            </Text>
            <Badge variant="default">{property.propertyType}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            variant={isFavorite ? 'primary' : 'outline'}
            icon="Heart"
            onClick={handleFavoriteToggle}
            loading={favoriteLoading}
            className={isFavorite ? 'text-white' : ''}
          >
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </Button>
          <Button variant="secondary" icon="Share2">
            Share
          </Button>
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <PhotoGallery images={property.images} title={property.title} />
      </motion.div>

      {/* Property Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <PropertyStats property={property} />
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Property Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 space-y-8"
        >
          {/* Description */}
          <div>
            <Text variant="heading" size="xl" weight="semibold" className="mb-4">
              About This Property
            </Text>
            <Text color="gray-700" className="leading-relaxed">
              {property.description}
            </Text>
          </div>

          {/* Amenities */}
          <div>
            <Text variant="heading" size="xl" weight="semibold" className="mb-4">
              Amenities & Features
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <motion.div
                  key={amenity}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <Text>{amenity}</Text>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div>
            <Text variant="heading" size="xl" weight="semibold" className="mb-4">
              Property Details
            </Text>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Text size="sm" color="gray-600" className="mb-1">Listed Date</Text>
                  <Text weight="medium">{formatDate(property.listingDate)}</Text>
                </div>
                <div>
                  <Text size="sm" color="gray-600" className="mb-1">Property Type</Text>
                  <Text weight="medium">{property.propertyType}</Text>
                </div>
                <div>
                  <Text size="sm" color="gray-600" className="mb-1">Square Footage</Text>
                  <Text weight="medium">{property.squareFeet.toLocaleString()} sq ft</Text>
                </div>
                <div>
                  <Text size="sm" color="gray-600" className="mb-1">Bedrooms / Bathrooms</Text>
                  <Text weight="medium">{property.bedrooms} bed / {property.bathrooms} bath</Text>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-1"
        >
          <div className="sticky top-24">
            <ContactForm property={property} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetail;